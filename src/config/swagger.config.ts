import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const SWAGGER_PATH = 'api/docs';

export function buildSwaggerDocument() {
    return new DocumentBuilder()
        .setTitle('Reon Practice API')
        .setDescription(
            'REST API для управления постами и комментариями.',
        )
        .setVersion('1.0')
        .addTag('Посты', 'CRUD-операции над постами')
        .addTag('Комментарии', 'CRUD-операции над комментариями к постам')
        .build();
}

export const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        filter: true,
    },
};
