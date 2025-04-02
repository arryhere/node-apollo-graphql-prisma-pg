import { Ctx, Query, Resolver } from 'type-graphql';
import type { ApolloGraphqlContext } from '../../interface/apolloGraphqlContext.interface.js';
import { HealthOutput } from './dto/health.output.js';
import { HealthService } from './health.service.js';

@Resolver()
export class HealthResolver {
  private readonly healthService: HealthService = new HealthService();

  @Query(() => HealthOutput)
  async health(@Ctx() ctx: ApolloGraphqlContext): Promise<HealthOutput> {
    return await this.healthService.health();
  }
}
