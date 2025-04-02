import type { HealthOutput } from './dto/health.output.js';

export class HealthService {
  async health(): Promise<HealthOutput> {
    return { status: 'ok' };
  }
}
