import { Service } from 'typedi';
import type { HealthOutput } from './dto/health.output.js';

@Service()
export class HealthService {
  async health(): Promise<HealthOutput> {
    return { status: 'ok' };
  }
}
