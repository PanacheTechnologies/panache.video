# Panache.video Go SDK

A powerful and elegant Go client for the Panache.video FFMPEG-as-an-API service.

## Features

- Fluent builder pattern API
- Visual job descriptions
- Chainable operations
- Built-in common FFMPEG operations
- Configurable HTTP client
- Proper error handling
- Context support
- Type-safe operations

## Installation

```bash
go get github.com/panache-video/go-sdk
```

## Quick Start

```go
package main

import (
	"context"
	"fmt"
	"time"

	"github.com/panache-video/go-sdk"
)

func main() {
	// Create a new client
	client := panache.NewClient("your-api-key")

	// Create a video processing job
	output, err := client.NewJob().
		FromURL("https://example.com/input.mp4").
		ToKey("output.mp4").
		ConvertToMP4().
		Resize(1280, 720).
		Trim(0, 10*time.Second).
		Process(context.Background())

	if err != nil {
		panic(err)
	}

	fmt.Printf("Processed video URL: %s\n", output.OutputURL)
}
```

## Common Use Cases

### 1. Video Conversion

```go
// Convert any video to MP4
output, err := client.NewJob().
	FromURL("input.avi").
	ToKey("output.mp4").
	ConvertToMP4().
	Process(ctx)
```

### 2. Video Resizing

```go
// Resize video to 720p
output, err := client.NewJob().
	FromURL("input.mp4").
	ToKey("output-720p.mp4").
	Resize(1280, 720).
	Process(ctx)
```

### 3. Video Trimming (like streampot's setStartTime and setDuration)

```go
// Extract a 3-second clip starting at 1 second
output, err := client.NewJob().
	FromURL("https://download.samplelib.com/mp4/sample-5s.mp4").
	ToKey("output.mp4").
	Trim(1*time.Second, 3*time.Second).
	Process(ctx)

if err != nil {
	panic(err)
}

fmt.Printf("Trimmed video URL: %s\n", output.OutputURL)
```

### 4. Audio Extraction

```go
// Extract audio from video
output, err := client.NewJob().
	FromURL("input.mp4").
	ToKey("audio.mp3").
	ExtractAudio().
	Process(ctx)
```

### 5. Watermarking

```go
// Add watermark to video
output, err := client.NewJob().
	FromURL("input.mp4").
	ToKey("watermarked.mp4").
	AddWatermark("logo.png", "10:10").
	Process(ctx)
```

### 6. Complex Processing

```go
// Multiple operations in sequence
output, err := client.NewJob().
	FromURL("input.mp4").
	ToKey("final.mp4").
	ConvertToMP4().
	Resize(1920, 1080).
	AddWatermark("logo.png", "10:10").
	Trim(5*time.Second, 30*time.Second).
	Process(ctx)
```

### 7. Complex Watermarking (like streampot's complexFilter)

```go
// Add a scaled watermark to video
output, err := client.NewJob().
	FromURL("https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4").
	ToKey("output5.mp4").
	CustomOperation(
		"-i", "https://pngfre.com/wp-content/uploads/orange-poster.png",
		"-filter_complex", "[1:v]scale=iw*0.1:ih*0.1[scaled];[0:v][scaled]overlay=100:100",
	).
	Process(ctx)

if err != nil {
	panic(err)
}

fmt.Printf("Watermarked video URL: %s\n", output.OutputURL)
```

### 8. Combined Operations

```go
// Create a pipeline that trims and adds watermark
outputs, err := client.NewPipeline().
	AddJob(
		client.NewJob().
			FromURL("https://sample-videos.com/video321/mp4/240/big_buck_bunny_240p_1mb.mp4").
			ToKey("trimmed.mp4").
			Trim(1*time.Second, 3*time.Second),
	).
	AddJob(
		client.NewJob().
			ToKey("final.mp4").
			CustomOperation(
				"-i", "https://pngfre.com/wp-content/uploads/orange-poster.png",
				"-filter_complex", "[1:v]scale=iw*0.1:ih*0.1[scaled];[0:v][scaled]overlay=100:100",
			),
	).
	Process(ctx)

if err != nil {
	panic(err)
}

fmt.Printf("Final video URL: %s\n", outputs[len(outputs)-1].OutputURL)
```

## Advanced Usage

### Job Pipelines

You can combine multiple jobs into a pipeline for complex processing workflows:

```go
// Create a pipeline of jobs
outputs, err := client.NewPipeline().
	AddJob(
		client.NewJob().
			FromURL("input.mp4").
			ToKey("resized.mp4").
			Resize(1280, 720),
	).
	AddJob(
		client.NewJob().
			ToKey("watermarked.mp4").
			AddWatermark("logo.png", "10:10"),
	).
	AddJob(
		client.NewJob().
			ToKey("final.mp4").
			ConvertToMP4().
			Trim(0, 30*time.Second),
	).
	Process(ctx)

if err != nil {
	panic(err)
}

// Get the final output URL
finalURL := outputs[len(outputs)-1].OutputURL
```

The pipeline automatically:

- Executes jobs in sequence
- Uses the output of each job as the input for the next job
- Returns all intermediate outputs
- Handles errors at any stage

### Custom HTTP Client

```go
client := panache.NewClient(
	"your-api-key",
	panache.WithHTTPClient(&http.Client{
		Timeout: 60 * time.Second,
	}),
)
```
