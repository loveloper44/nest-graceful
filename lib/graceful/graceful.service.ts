import { IGracefulManager } from './GracefulManager.interface';
import { Inject, ServiceUnavailableException, INestApplication, INestExpressApplication } from '@nestjs/common';

export enum ServiceStatus {
    Idle = 'Idle',
    Running = 'Running',
    ShuttingDown = 'ShuttingDown',
}

export class GracefulService {
    private server: INestApplication & INestExpressApplication;
    private _status: ServiceStatus;

    constructor(@Inject('IGracefulManager') private gracefulManager: IGracefulManager) {
        this._status = ServiceStatus.Idle;
    }

    private async onShutdown(): Promise<void> {

        if (this._status === ServiceStatus.ShuttingDown) {
            return;
        }

        this._status = ServiceStatus.ShuttingDown;

        await this.gracefulManager.beforeServerClose();

        await this.server.close();

        await this.gracefulManager.afterServerClosed();
    }

    private async start(port: number): Promise<void> {

        if (this._status === ServiceStatus.Running) {
            throw new ServiceUnavailableException('Server is already started!');
        }

        await this.gracefulManager.beforeServerStart();

        await this.server.listen(port);

        await this.gracefulManager.afterServerStarted();

        this._status = ServiceStatus.Running;
    }

    getStatus() {
        return this._status;
    }

    bind(server: INestApplication & INestExpressApplication) {
        this.server = server;
        process.on('SIGTERM', async () => {
            await setTimeout(async () => {
                await this.onShutdown();
            }, 3000);
        })

        process.on('SIGINT', async () => {
            await setTimeout(async () => {
                await this.onShutdown();
            }, 3000);
        })
    }

    async listen(port: number) {

        if (!this.server) {
            throw new ServiceUnavailableException('Server should be bounded!');
        }

        await this.start(port);

    }
}
