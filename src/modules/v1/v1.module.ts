import { Module } from "@nestjs/common";

import { FuelsModule } from "./fuels";

@Module({
    imports: [FuelsModule]
})
export class V1Module {}
