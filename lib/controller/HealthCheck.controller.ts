import { Controller, Get, Inject } from '@nestjs/common';
import { IGracefulManager } from '../graceful/GracefulManager.interface';
import { GracefulService, ServiceStatus } from '../graceful/graceful.service';

@Controller('health')
export class HealthCheckController {

    constructor(
        @Inject('IGracefulManager') private gracefulManager: IGracefulManager,
        private gracefulService: GracefulService
    ) { }

    @Get()
    async healthCheck() {
        const status: ServiceStatus = this.gracefulService.getStatus();
        return await this.gracefulManager.healthcheck(status);
    }
}