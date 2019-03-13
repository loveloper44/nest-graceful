import { Module } from "@nestjs/common";
import { GracefulManager } from "./GracefulManager";
import { GracefulModule } from '../../lib/module/GracefulModule';
import { CoreModule } from "./core.module";

@Module({
    imports: [
        GracefulModule.forRoot(GracefulManager, [CoreModule]),
    ],
    providers: [
    ],
})
export class AppModule { }
