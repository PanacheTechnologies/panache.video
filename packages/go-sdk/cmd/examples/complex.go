package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	panache "github.com/panachetechnologies/panache.video/packages/go-sdk"
)

func main() {
	// Get API key from environment variable
	apiKey := os.Getenv("PANACHE_API_KEY")

	// Create client
	client := panache.NewClient(apiKey).SetBaseURL("http://localhost:3333")
	ctx := context.Background()

	// Example: Create a social media ready video clip
	// 1. Trim the video
	// 2. Resize to 1080p
	// 3. Add a logo watermark
	// 4. Add a text overlay
	// 5. Convert to MP4 with high quality
	outputs, err := client.NewPipeline().
		AddJob(
			client.NewJob().
				FromURL("https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4").
				ToKey("trimmed.mp4").
				Trim(10*time.Second, 15*time.Second),
		).
		AddJob(
			client.NewJob().
				ToKey("watermarked.mp4").
				CustomOperation(
					"-i", "https://pngfre.com/wp-content/uploads/orange-poster.png",
					"-filter_complex", "[1:v]scale=iw*0.2:ih*0.2[scaled];[0:v][scaled]overlay=20:20",
				),
		).
		Process(ctx)

	if err != nil {
		log.Fatalf("Error processing video: %v", err)
	}

	// Print all intermediate URLs
	for i, output := range outputs {
		fmt.Printf("Step %d output URL: %s\n", i+1, output.OutputURL)
	}

	// Print final URL
	fmt.Printf("\nFinal video URL: %s\n", outputs[len(outputs)-1].OutputURL)
}
