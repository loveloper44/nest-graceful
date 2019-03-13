
## Installing

Using npm:

```bash
$ npm install nest-graceful
```

## Example

Make GracefulManager with IGracefulManager

```js

import { Injectable } from "@nestjs/common";
import { IGracefulManager, ServiceStatus } from "nest-graceful";
import { DBConnection } from "../DBConnection";

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
        // ServiceStatus : Idle, Running, ShuttingDown
        return {
            result: status,
        };
    }
}

```

Import GracefulModule like below.

```js

import { Module } from "@nestjs/common";
import { GracefulManager, GracefulModule } from  "nest-graceful";
import { CoreModule } from "./core.module";

@Module({
    imports: [
        // If your GracefulManager has dependencies then you have to import module which exports the dependencies.
        GracefulModule.forRoot(GracefulManager, [CoreModule]),
    ],
    providers: [
    ],
})
export class AppModule { }

```

Start nest app

```js

const app = await NestFactory.create(AppModule);

const gracefulService = app.get(GracefulService);

gracefulService.bind(app);

await gracefulService.listen(3000);


```

Check healthcheck

```js
Get http://localhost:3000/healthcheck
```