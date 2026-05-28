import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MongooseValidationExceptionFilter } from './common/filters/mongoose-validation.exception-filter';
import { validationExceptionFactory } from './common/validation/validation-exception.factory';
import {
    buildSwaggerDocument,
    SWAGGER_PATH,
    swaggerCustomOptions,
} from './config';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new MongooseValidationExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            exceptionFactory: validationExceptionFactory,
        }),
    );

    const swaggerDocument = SwaggerModule.createDocument(
        app,
        buildSwaggerDocument(),
    );
    SwaggerModule.setup(SWAGGER_PATH, app, swaggerDocument, swaggerCustomOptions);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('app.port', 3000);
    await app.listen(port);
}
bootstrap();
