import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { GracefulService } from '../lib/graceful/graceful.service';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    const gracefulService = app.get(GracefulService);

    gracefulService.bind(app);

    await gracefulService.listen(3000);
}
bootstrap();
