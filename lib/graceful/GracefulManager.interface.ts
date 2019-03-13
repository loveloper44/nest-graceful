import { ServiceStatus } from "./graceful.service";

export interface IGracefulManager {

    beforeServerStart(): Promise<void>;

    afterServerStarted(): Promise<void>;

    healthcheck(status: ServiceStatus): Promise<any>;

    beforeServerClose(): Promise<void>;

    afterServerClosed(): Promise<void>;

}