import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { HealthOutput } from './dto/health.output.js';
import { HealthService } from './health.service.js';

@Service()
@Resolver()
export class HealthResolver {
  constructor(
    // private readonly healthService: HealthService = new HealthService()
    private readonly healthService: HealthService
  ) {}

  @Query(() => HealthOutput)
  async health(): Promise<HealthOutput> {
    console.log(this.healthService);
    return await this.healthService.health();
  }
}
