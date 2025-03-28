import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { HealthOutput } from './dto/health.output.js';
import type { HealthService } from './health.service.js';

@Service()
@Resolver()
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  @Query(() => HealthOutput)
  async health(): Promise<HealthOutput> {
    return await this.healthService.health();
  }
}
