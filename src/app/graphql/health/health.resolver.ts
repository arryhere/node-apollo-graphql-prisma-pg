import { Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { HealthOutput } from './dto/health.output.js';
import { HealthService } from './health.service.js';

@Resolver()
@Service()
export class HealthResolver {
  constructor(@Inject(() => HealthService) private readonly healthService: HealthService) {} 

  @Query(() => HealthOutput)
  async health(): Promise<HealthOutput> {
    console.log('health');
    return await this.healthService.health();
  }
}