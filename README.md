# Panache.video

<h1 align="center">
  <a href="https://panache.video">
    Panache.video
  </a>
</h1>

<p align="center">
  <strong>FFMPEG-as-a-Service for developers.</strong>
</p>

<p align="center">
  <a href="./LICENSE">License</a>
  ·
  <a href="https://discord.gg/VKzhbCUVjt">Community</a>
</p>

## Introduction

Panache.video is a powerful FFMPEG-as-a-Service platform that enables developers to perform complex video processing operations through a simple API. Built with scalability and reliability in mind, it handles video processing tasks in isolated environments and provides a seamless experience for developers.

## Features

- 🔄 **Chainable Operations**: Perform multiple FFMPEG operations in sequence
- 🚀 **Scalable Processing**: Each job runs in an isolated environment
- 💾 **Cloud Storage**: Automatic storage of processed videos
- 🔒 **Secure Access**: Presigned URLs for secure video access
- 🛠️ **Developer-Friendly**: Simple API with comprehensive SDKs

## Quick Start

### Using the Go SDK

```go
package main

import (
    "context"
    "log"
    "os"
    "time"

    panache "github.com/panachetechnologies/panache.video/packages/go-sdk"
)

func main() {
    // Initialize client
    client := panache.NewClient(os.Getenv("PANACHE_API_KEY"))

    // Create a video processing pipeline
    outputs, err := client.NewPipeline().
        AddJob(
            client.NewJob().
                FromURL("https://example.com/input.mp4").
                ToKey("processed.mp4").
                Trim(10*time.Second, 15*time.Second),
        ).
        Process(context.Background())

    if err != nil {
        log.Fatal(err)
    }

    // Access the processed video URL
    log.Printf("Processed video URL: %s", outputs[0].OutputURL)
}
```

## API Reference

### Process Video

```typescript
interface ProcessVideoRequest {
  input_url: string; // URL of the input video
  output_key: string; // Storage key for the output
  operations: Array<{
    ffmpeg_args: string[]; // FFMPEG arguments
  }>;
}
```

### Supported Operations

- **Trim**: Cut video segments
- **Resize**: Change video dimensions
- **Watermark**: Add image overlays
- **Text Overlay**: Add text to videos
- **Custom FFMPEG**: Use any FFMPEG command

## Architecture

Panache.video uses a microservices architecture:

- **API Layer**: Handles client requests and job orchestration
- **Processing Layer**: Runs FFMPEG operations in isolated environments
- **Storage Layer**: Manages video storage and access

## Development

### Prerequisites

- Go 1.21+
- Node.js 18+
- Docker
- FFMPEG

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/panachetechnologies/panache.video.git
   cd panache.video
   ```

2. Install dashboard dependencies:

   ```bash
   cd apps/dashboard
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   - `FLY_API_TOKEN`: Your Fly.io API token
   - `FLY_APP_NAME`: Your Fly.io app name
   - `FLY_DOCKER_IMAGE`: The Docker image for video processing
   - `AWS_*`: AWS credentials for S3 storage

4. Start the development server:
   ```bash
   npm run dev
   ```

The dashboard will be available at `http://localhost:3333`.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
