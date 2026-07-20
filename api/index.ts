import express from "express";
import { ExpressAdapter } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "../src/app.module";

const expressApp = express();

let appInitialized = false;

async function bootstrap() {
    if (appInitialized) return;

    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
    );

    const config = app.get(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.enableCors({
        origin: config.get<string>("FRONTEND_URL") || "*",
        credentials: true,
    });

    await app.init();


    // Debug registered routes
    const router = app
        .getHttpAdapter()
        .getInstance()
        ._router;

    console.log(
        "REGISTERED ROUTES:",
        router?.stack
            ?.filter((layer: any) => layer.route)
            .map((layer: any) => ({
                path: layer.route.path,
                method: Object.keys(layer.route.methods),
            })),
    );


    appInitialized = true;
}

export default async (req: any, res: any) => {
    await bootstrap();
    return expressApp(req, res);
};