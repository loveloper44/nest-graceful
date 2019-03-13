import { DBConnection } from "../DBConnection";
import { Module } from "@nestjs/common";

@Module({
    providers: [
        DBConnection,
    ],
    exports: [
        DBConnection,
    ]
})
export class CoreModule { }
