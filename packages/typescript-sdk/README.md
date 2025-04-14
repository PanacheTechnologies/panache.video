# Panache.video TypeScript SDK

A TypeScript SDK for the Panache.video API, providing a fluent interface for video processing operations.

## Installation

```bash
npm install @panache/video-sdk
```

## Usage

### Basic Setup

```typescript
import { Client } from "@panache/video-sdk";

const client = new Client("your-api-key");

// Optional configuration
const client = new Client("your-api-key", {
  baseURL: "https://api.panache.video",
  timeout: 30000, // milliseconds
});
```

### Single Job Example

```typescript
const job = client
  .newJob()
  .fromURL("https://example.com/input.mp4")
  .toKey("output.mp4")
  .convertToMP4()
  .resize(1280, 720);

const result = await job.process();
console.log(result.output_url);
```

### Pipeline Example

```typescript
const pipeline = client
  .newPipeline()
  .addJob(
    client
      .newJob()
      .fromURL("https://example.com/input.mp4")
      .toKey("resized.mp4")
      .resize(1280, 720)
  )
  .addJob(
    client.newJob().toKey("final.mp4").addWatermark("watermark.png", "10:10")
  );

const results = await pipeline.process();
console.log(results[results.length - 1].output_url);
```

### Common FFmpeg Operations

The SDK provides several common FFmpeg operations as constants:

```typescript
import {
  ConvertToMP4,
  ResizeVideo,
  ExtractAudio,
  ExtractVideo,
  TrimVideo,
  AddWatermark,
} from "@panache/video-sdk";

// Use in a job
const job = client
  .newJob()
  .fromURL("input.mp4")
  .toKey("output.mp4")
  .customOperation(...ConvertToMP4.ffmpeg_args)
  .customOperation(...ResizeVideo(1280, 720).ffmpeg_args);
```

## API Reference

### Client

- `new Client(apiKey: string, options?: ClientOptions)`
- `setBaseURL(baseURL: string): this`
- `newJob(): Job`
- `newPipeline(): Pipeline`

### Job

- `fromURL(url: string): this`
- `toKey(key: string): this`
- `convertToMP4(): this`
- `resize(width: number, height: number): this`
- `trim(start: number, duration: number): this`
- `extractAudio(): this`
- `extractVideo(): this`
- `addWatermark(watermarkPath: string, position: string): this`
- `customOperation(...args: string[]): this`
- `process(): Promise<ProcessVideoOutput>`

### Pipeline

- `addJob(job: Job): this`
- `process(): Promise<ProcessVideoOutput[]>`

## Error Handling

The SDK throws errors in the following cases:

- Invalid input (missing URL or output key)
- API errors (with the error message from the server)
- Network errors
- Timeout errors

## License

ISC
