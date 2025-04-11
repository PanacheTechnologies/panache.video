package panache

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Client represents the Panache.video API client
type Client struct {
	baseURL    string
	apiKey     string
	httpClient *http.Client
}

// NewClient creates a new Panache.video API client
func NewClient(apiKey string, opts ...ClientOption) *Client {
	client := &Client{
		baseURL:    "https://api.panache.video",
		apiKey:     apiKey,
		httpClient: &http.Client{Timeout: 30 * time.Second},
	}

	for _, opt := range opts {
		opt(client)
	}

	return client
}

func (c *Client) SetBaseURL(baseURL string) *Client {
	c.baseURL = baseURL
	return c
}

// ClientOption represents a function that can modify the client configuration
type ClientOption func(*Client)

// WithHTTPClient sets a custom HTTP client
func WithHTTPClient(httpClient *http.Client) ClientOption {
	return func(c *Client) {
		c.httpClient = httpClient
	}
}

// Job represents a video processing job
type Job struct {
	client    *Client
	inputURL  string
	outputKey string
	ops       []FFmpegOperation
}

// NewJob creates a new video processing job
func (c *Client) NewJob() *Job {
	return &Job{
		client: c,
	}
}

// FromURL sets the input URL
func (j *Job) FromURL(url string) *Job {
	j.inputURL = url
	return j
}

// ToKey sets the output key
func (j *Job) ToKey(key string) *Job {
	j.outputKey = key
	return j
}

// ConvertToMP4 converts the video to MP4 format
func (j *Job) ConvertToMP4() *Job {
	j.ops = append(j.ops, NewFFmpegOperation("-c:v", "libx264", "-c:a", "aac", "-strict", "experimental"))
	return j
}

// Resize resizes the video to the specified dimensions
func (j *Job) Resize(width, height int) *Job {
	j.ops = append(j.ops, NewFFmpegOperation("-vf", fmt.Sprintf("scale=%d:%d", width, height)))
	return j
}

// Trim trims the video to the specified duration
func (j *Job) Trim(start, duration time.Duration) *Job {
	j.ops = append(j.ops, NewFFmpegOperation(
		"-ss", start.String(),
		"-t", duration.String(),
	))
	return j
}

// ExtractAudio extracts audio from the video
func (j *Job) ExtractAudio() *Job {
	j.ops = append(j.ops, NewFFmpegOperation("-vn", "-acodec", "copy"))
	return j
}

// ExtractVideo extracts video without audio
func (j *Job) ExtractVideo() *Job {
	j.ops = append(j.ops, NewFFmpegOperation("-an", "-vcodec", "copy"))
	return j
}

// AddWatermark adds a watermark to the video
func (j *Job) AddWatermark(watermarkPath string, position string) *Job {
	j.ops = append(j.ops, NewFFmpegOperation(
		"-i", watermarkPath,
		"-filter_complex", fmt.Sprintf("overlay=%s", position),
	))
	return j
}

// CustomOperation adds a custom FFmpeg operation
func (j *Job) CustomOperation(args ...string) *Job {
	j.ops = append(j.ops, NewFFmpegOperation(args...))
	return j
}

// Process executes the video processing operations
func (j *Job) Process(ctx context.Context) (*ProcessVideoOutput, error) {
	if j.inputURL == "" {
		return nil, fmt.Errorf("input URL is required")
	}
	if j.outputKey == "" {
		return nil, fmt.Errorf("output key is required")
	}

	input := ProcessVideoInput{
		InputURL:   j.inputURL,
		OutputKey:  j.outputKey,
		Operations: j.ops,
	}

	return j.client.processVideo(ctx, input)
}

// FFmpegOperation represents a single FFmpeg operation
type FFmpegOperation struct {
	Args []string `json:"ffmpeg_args"`
}

// NewFFmpegOperation creates a new FFmpeg operation with the given arguments
func NewFFmpegOperation(args ...string) FFmpegOperation {
	return FFmpegOperation{
		Args: args,
	}
}

// ProcessVideoInput represents the input for video processing
type ProcessVideoInput struct {
	InputURL   string            `json:"input_url"`
	OutputKey  string            `json:"output_key"`
	Operations []FFmpegOperation `json:"operations"`
}

// ProcessVideoOutput represents the output from video processing
type ProcessVideoOutput struct {
	OutputURL string `json:"output_url"`
}

// ErrorResponse represents an API error response
type ErrorResponse struct {
	Error string `json:"error"`
}

// processVideo processes a video using the specified FFmpeg operations
func (c *Client) processVideo(ctx context.Context, input ProcessVideoInput) (*ProcessVideoOutput, error) {
	url := fmt.Sprintf("%s/process-video", c.baseURL)

	reqBody, err := json.Marshal(input)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(reqBody))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.apiKey))

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp ErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errResp); err != nil {
			return nil, fmt.Errorf("failed to decode error response: %w", err)
		}
		return nil, fmt.Errorf("API error: %s", errResp.Error)
	}

	var output ProcessVideoOutput
	if err := json.NewDecoder(resp.Body).Decode(&output); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return &output, nil
}

// Common FFmpeg operations
var (
	// ConvertToMP4 converts a video to MP4 format
	ConvertToMP4 = NewFFmpegOperation("-c:v", "libx264", "-c:a", "aac", "-strict", "experimental")

	// ResizeVideo resizes a video to the specified dimensions
	ResizeVideo = func(width, height int) FFmpegOperation {
		return NewFFmpegOperation("-vf", fmt.Sprintf("scale=%d:%d", width, height))
	}

	// ExtractAudio extracts audio from a video
	ExtractAudio = NewFFmpegOperation("-vn", "-acodec", "copy")

	// ExtractVideo extracts video without audio
	ExtractVideo = NewFFmpegOperation("-an", "-vcodec", "copy")

	// TrimVideo trims a video to the specified duration
	TrimVideo = func(start, duration time.Duration) FFmpegOperation {
		return NewFFmpegOperation(
			"-ss", start.String(),
			"-t", duration.String(),
		)
	}

	// AddWatermark adds a watermark to the video
	AddWatermark = func(watermarkPath string, position string) FFmpegOperation {
		return NewFFmpegOperation(
			"-i", watermarkPath,
			"-filter_complex", fmt.Sprintf("overlay=%s", position),
		)
	}
)

// Pipeline represents a sequence of video processing jobs
type Pipeline struct {
	client *Client
	jobs   []*Job
}

// NewPipeline creates a new video processing pipeline
func (c *Client) NewPipeline() *Pipeline {
	return &Pipeline{
		client: c,
	}
}

// AddJob adds a job to the pipeline
func (p *Pipeline) AddJob(job *Job) *Pipeline {
	p.jobs = append(p.jobs, job)
	return p
}

// Process executes all jobs in the pipeline sequentially
func (p *Pipeline) Process(ctx context.Context) ([]*ProcessVideoOutput, error) {
	if len(p.jobs) == 0 {
		return nil, fmt.Errorf("pipeline must contain at least one job")
	}

	outputs := make([]*ProcessVideoOutput, 0, len(p.jobs))

	for i, job := range p.jobs {
		// For all jobs except the first one, use the previous job's output as input
		if i > 0 {
			job.FromURL(outputs[i-1].OutputURL)
		}

		output, err := job.Process(ctx)
		if err != nil {
			return nil, fmt.Errorf("job %d failed: %w", i+1, err)
		}

		outputs = append(outputs, output)
	}

	return outputs, nil
}
