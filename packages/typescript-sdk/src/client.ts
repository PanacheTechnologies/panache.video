export interface ClientOptions {
  baseURL?: string;
  timeout?: number;
}

export interface FFmpegOperation {
  ffmpeg_args: string[];
}

export interface ProcessVideoInput {
  input_url: string;
  output_key: string;
  operations: FFmpegOperation[];
}

export interface ProcessVideoOutput {
  output_url: string;
}

export interface ErrorResponse {
  error: string;
}

export class Client {
  private baseURL: string;
  private apiKey: string;
  private timeout: number;

  constructor(apiKey: string, options: ClientOptions = {}) {
    this.apiKey = apiKey;
    this.baseURL = options.baseURL || "https://api.panache.video";
    this.timeout = options.timeout || 30000;
  }

  public setBaseURL(baseURL: string): this {
    this.baseURL = baseURL;
    return this;
  }

  public newJob(): Job {
    return new Job(this);
  }

  public newPipeline(): Pipeline {
    return new Pipeline();
  }

  private async processVideo(
    input: ProcessVideoInput
  ): Promise<ProcessVideoOutput> {
    const url = `${this.baseURL}/process-video`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(input),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(`API error: ${errorData.error}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timed out");
        }
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }
}

export class Job {
  private client: Client;
  private inputURL: string = "";
  private outputKey: string = "";
  private operations: FFmpegOperation[] = [];

  constructor(client: Client) {
    this.client = client;
  }

  public fromURL(url: string): this {
    this.inputURL = url;
    return this;
  }

  public toKey(key: string): this {
    this.outputKey = key;
    return this;
  }

  public convertToMP4(): this {
    this.operations.push({
      ffmpeg_args: [
        "-c:v",
        "libx264",
        "-c:a",
        "aac",
        "-strict",
        "experimental",
      ],
    });
    return this;
  }

  public resize(width: number, height: number): this {
    this.operations.push({
      ffmpeg_args: ["-vf", `scale=${width}:${height}`],
    });
    return this;
  }

  public trim(start: number, duration: number): this {
    this.operations.push({
      ffmpeg_args: ["-ss", start.toString(), "-t", duration.toString()],
    });
    return this;
  }

  public extractAudio(): this {
    this.operations.push({
      ffmpeg_args: ["-vn", "-acodec", "copy"],
    });
    return this;
  }

  public extractVideo(): this {
    this.operations.push({
      ffmpeg_args: ["-an", "-vcodec", "copy"],
    });
    return this;
  }

  public addWatermark(watermarkPath: string, position: string): this {
    this.operations.push({
      ffmpeg_args: [
        "-i",
        watermarkPath,
        "-filter_complex",
        `overlay=${position}`,
      ],
    });
    return this;
  }

  public customOperation(...args: string[]): this {
    this.operations.push({ ffmpeg_args: args });
    return this;
  }

  public async process(): Promise<ProcessVideoOutput> {
    if (!this.inputURL) {
      throw new Error("input URL is required");
    }
    if (!this.outputKey) {
      throw new Error("output key is required");
    }

    const input: ProcessVideoInput = {
      input_url: this.inputURL,
      output_key: this.outputKey,
      operations: this.operations,
    };

    return this.client["processVideo"](input);
  }
}

export class Pipeline {
  private jobs: Job[] = [];

  constructor() {}

  public addJob(job: Job): this {
    this.jobs.push(job);
    return this;
  }

  public async process(): Promise<ProcessVideoOutput[]> {
    if (this.jobs.length === 0) {
      throw new Error("pipeline must contain at least one job");
    }

    const outputs: ProcessVideoOutput[] = [];

    for (let i = 0; i < this.jobs.length; i++) {
      const job = this.jobs[i];

      // For all jobs except the first one, use the previous job's output as input
      if (i > 0) {
        job.fromURL(outputs[i - 1].output_url);
      }

      try {
        const output = await job.process();
        outputs.push(output);
      } catch (error) {
        throw new Error(
          `job ${i + 1} failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    }

    return outputs;
  }
}

// Common FFmpeg operations
export const ConvertToMP4: FFmpegOperation = {
  ffmpeg_args: ["-c:v", "libx264", "-c:a", "aac", "-strict", "experimental"],
};

export const ResizeVideo = (
  width: number,
  height: number
): FFmpegOperation => ({
  ffmpeg_args: ["-vf", `scale=${width}:${height}`],
});

export const ExtractAudio: FFmpegOperation = {
  ffmpeg_args: ["-vn", "-acodec", "copy"],
};

export const ExtractVideo: FFmpegOperation = {
  ffmpeg_args: ["-an", "-vcodec", "copy"],
};

export const TrimVideo = (
  start: number,
  duration: number
): FFmpegOperation => ({
  ffmpeg_args: ["-ss", start.toString(), "-t", duration.toString()],
});

export const AddWatermark = (
  watermarkPath: string,
  position: string
): FFmpegOperation => ({
  ffmpeg_args: ["-i", watermarkPath, "-filter_complex", `overlay=${position}`],
});
