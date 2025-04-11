package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/charmbracelet/log"
	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humago"
	"github.com/joho/godotenv"
	"github.com/panache-video/server/pkg/env"
)

// FFmpegOperation represents a single FFmpeg operation
type FFmpegOperation struct {
	FFmpegArgs []string `json:"ffmpeg_args" doc:"FFmpeg arguments to apply"`
}

// FFmpegInput represents the input for FFmpeg processing
type FFmpegInput struct {
	Body struct {
		InputURL   string            `json:"input_url" doc:"URL of the input video file"`
		OutputKey  string            `json:"output_key" doc:"S3 key for the final output file"`
		Operations []FFmpegOperation `json:"operations" doc:"List of FFmpeg operations to perform sequentially"`
	}
}

// OperationStatus represents the status of a single operation
type OperationStatus struct {
	Step   int    `json:"step" doc:"Step number in the sequence"`
	Status string `json:"status"` // "pending", "processing", "completed", "failed"
	Error  string `json:"error,omitempty"`
}

// FFmpegOutput represents the response from FFmpeg processing
type FFmpegOutput struct {
	Body struct {
		OutputURL string `json:"output_url" doc:"URL of the final processed video"`
	}
}

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Configure logger
	logger := log.New(os.Stderr)
	logger.SetLevel(log.DebugLevel)
	logger.SetTimeFormat("2006-01-02 15:04:05")
	logger.SetPrefix("server")

	// Initialize S3 client
	cfg, err := config.LoadDefaultConfig(context.Background())
	if err != nil {
		logger.Fatal("failed to load storage config", "error", err)
	}
	s3Client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(os.Getenv("AWS_ENDPOINT_URL_S3"))
		o.Region = os.Getenv("AWS_REGION")
	})

	bucket := os.Getenv("BUCKET_NAME")

	// Create a new router & API.
	router := http.NewServeMux()
	api := humago.New(router, huma.DefaultConfig("Panache.video server API", "1.0.0"))

	huma.Register(api, huma.Operation{
		Method: "POST",
		Path:   "/process-video",
	}, func(ctx context.Context, input *FFmpegInput) (*FFmpegOutput, error) {
		logger.Debug("received video processing request", "operations", len(input.Body.Operations))

		// Initialize response with pending status for all operations
		resp := &FFmpegOutput{}

		currentInput := input.Body.InputURL

		for i, op := range input.Body.Operations {
			// Create temporary files
			tempOutput := fmt.Sprintf("/tmp/output-%d-%d-%s", time.Now().UnixNano(), i, input.Body.OutputKey)

			// Process video with FFmpeg
			args := append([]string{"-i", currentInput}, op.FFmpegArgs...)
			args = append(args, tempOutput)
			ffmpegCmd := exec.Command("ffmpeg", args...)
			ffmpegCmd.Stderr = os.Stderr

			if err := ffmpegCmd.Run(); err != nil {
				return resp, fmt.Errorf("operation %d failed: %v", i+1, err)
			}

			// Update current input for next operation
			currentInput = tempOutput
		}

		// After all operations are complete, upload the final result
		finalOutput := currentInput
		file, err := os.Open(finalOutput)
		if err != nil {
			return resp, fmt.Errorf("failed to open final output file: %v", err)
		}
		defer file.Close()

		_, err = s3Client.PutObject(ctx, &s3.PutObjectInput{
			Bucket: &bucket,
			Key:    &input.Body.OutputKey,
			Body:   file,
		})

		if err != nil {
			return resp, fmt.Errorf("failed to upload to storage: %v", err)
		}

		// Generate presigned URL for the final output
		presignClient := s3.NewPresignClient(s3Client)
		presignResult, err := presignClient.PresignGetObject(ctx, &s3.GetObjectInput{
			Bucket: &bucket,
			Key:    &input.Body.OutputKey,
		})

		if err != nil {
			return resp, fmt.Errorf("failed to generate presigned URL: %v", err)
		}

		resp.Body.OutputURL = presignResult.URL

		return resp, nil
	})

	// Start the server!
	addr := env.GetVar("HTTP_ADDR", ":8888")
	logger.Info("starting http server", "addr", addr)
	if err := http.ListenAndServe(addr, router); err != nil {
		logger.Fatal("failed to start http server", "error", err)
	}
}
