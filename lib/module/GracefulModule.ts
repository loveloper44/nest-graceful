import { Module, DynamicModule, Type, Provider, ForwardReference } from '@nestjs/common';
import { HealthCheckController } from '../controller/HealthCheck.controller';
import { GracefulService } from '../graceful/graceful.service';
import { IGracefulManager } from '../graceful/GracefulManager.interface';

@Module({
    controllers: [HealthCheckController],
    providers: [GracefulService],
})
export class GracefulModule {
    static forRoot(
        gracefulManager: Type<IGracefulManager>,
        imports: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>)[],
    ): DynamicModule {

        const gracefulManagerProvider: Provider = {
            provide: 'IGracefulManager',
            useClass: gracefulManager,
        };

        return {
            imports,
            module: GracefulModule,
            providers: [gracefulManagerProvider],
        };
    }
}