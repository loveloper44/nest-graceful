import { Injectable } from "@nestjs/common";
import { IGracefulManager } from "../../lib/graceful/GracefulManager.interface";
import { DBConnection } from "../DBConnection";
import { ServiceStatus } from "../../lib";

@Injectable()
export class GracefulManager implements IGracefulManager {
    constructor(private dbConnection: DBConnection) { }
    async beforeServerStart(): Promise<void> {
        console.log('before server start');
        await this.dbConnection.connect();
    }
    async afterServerStarted(): Promise<void> {
        console.log('after server started');
    }
    async beforeServerClose(): Promise<void> {
        await this.dbConnection.close();
        console.log('before server close');
    }
    async afterServerClosed(): Promise<void> {
        console.log('after server closed');
    }
    async healthcheck(status: ServiceStatus): Promise<any> {
        return {
            result: status,
        };
    }
}
