import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'

interface MachineResponse {
  id: string
  private_ip: string
  [key: string]: unknown
}

interface ProcessVideoRequest {
  input_url: string
  output_key: string
  operations: Array<{
    ffmpeg_args: string[]
  }>
}

async function stopMachine(machineId: string) {
  try {
    await fetch(
      `https://api.machines.dev/v1/apps/${env.get('FLY_APP_NAME')}/machines/${machineId}/stop`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.get('FLY_API_TOKEN')}`,
        },
      }
    )
  } catch (error) {
    console.error('Failed to stop machine:', error)
  }
}

async function waitForMachine(machineId: string): Promise<boolean> {
  try {
    const waitResponse = await fetch(
      `https://api.machines.dev/v1/apps/${env.get('FLY_APP_NAME')}/machines/${machineId}/wait`,
      {
        headers: {
          Authorization: `Bearer ${env.get('FLY_API_TOKEN')}`,
        },
      }
    )

    return waitResponse.ok
  } catch (error) {
    console.error('Failed to wait for machine:', error)
    return false
  }
}

export default class ProcessVideoController {
  async handle({ request, response }: HttpContext) {
    let machineId: string | null = null

    try {
      const payload = request.body() as ProcessVideoRequest

      // Create a temporary machine for video processing
      const machineResponse = await fetch(
        `https://api.machines.dev/v1/apps/${env.get('FLY_APP_NAME')}/machines`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.get('FLY_API_TOKEN')}`,
          },
          body: JSON.stringify({
            config: {
              auto_destroy: true,
              guest: {
                cpu_kind: 'shared',
                cpus: 2,
                memory_mb: 4096,
              },
              restart: {
                policy: 'no',
              },
              image: env.get('FLY_DOCKER_IMAGE'),
              services: [
                {
                  protocol: 'tcp',
                  internal_port: 8888,
                  ports: [
                    { port: 443, handlers: ['tls', 'http'] },
                    { port: 80, handlers: ['http'] },
                  ],
                  checks: [
                    {
                      type: 'tcp',
                      interval: '10s',
                      timeout: '2s',
                    },
                  ],
                },
              ],
            },
            name: `video-processor-${cuid()}`,
            region: 'lax', // Los Angeles region
          }),
        }
      )

      if (!machineResponse.ok) {
        return response.status(500).json({
          error: 'Failed to create machine',
        })
      }

      const machine = (await machineResponse.json()) as MachineResponse
      machineId = machine.id

      // Wait for machine to be ready using the wait endpoint
      const isReady = await waitForMachine(machineId)
      if (!isReady) {
        return response.status(500).json({
          error: 'Machine failed to start in time',
        })
      }

      // Wait for the machine to be ready
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Replay the request to the machine
      const processResponse = await fetch(
        `https://${env.get('FLY_APP_NAME')}.fly.dev/process-video`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Fly-Replay': `instance=${machine.id}`,
          },
          body: JSON.stringify(payload),
        }
      )

      if (!processResponse.ok) {
        return response.status(500).json({
          error: 'Failed to process video',
        })
      }

      const result = await processResponse.json()

      return response.json(result)
    } catch (error: unknown) {
      console.error(error)
      return response.status(500).json({
        error: 'Failed to process video',
      })
    } finally {
      if (machineId) {
        await stopMachine(machineId)
      }
    }
  }
}
