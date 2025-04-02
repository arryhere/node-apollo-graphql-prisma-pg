import { Ctx, Query, Resolver } from 'type-graphql';
import { HealthOutput } from './dto/health.output.js';
import { HealthService } from './health.service.js';

@Resolver()
export class HealthResolver {
  private readonly healthService: HealthService = new HealthService();

  // @Authorized()
  @Query(() => HealthOutput)
  async health(@Ctx() ctx: unknown): Promise<HealthOutput> {
    return await this.healthService.health();
  }
}
