import { Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { HealthOutput } from './dto/health.output.js';
import { HealthService } from './health.service.js';

@Resolver()
@Service()
export class HealthResolver {
  constructor( private readonly healthService: any) {} 

  @Query(() => HealthOutput)
  async health(): Promise<HealthOutput> {
    console.log('health');
    // const h = new HealthService()
    // return await  h.health()
    console.log('healthService', this.healthService);
    return await this.healthService.health();
  }
}