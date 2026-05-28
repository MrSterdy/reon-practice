import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
    @ApiProperty({
        description: 'HTTP-код ошибки',
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Список сообщений об ошибках валидации',
        example: ['Заголовок обязателен'],
        type: [String],
    })
    message: string[];

    @ApiProperty({
        description: 'Краткое название HTTP-ошибки',
        example: 'Bad Request',
    })
    error: string;
}

export class BadRequestErrorResponseDto {
    @ApiProperty({
        description: 'HTTP-код ошибки',
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Описание ошибки',
        example: 'Необходимо указать хотя бы одно поле для обновления',
    })
    message: string;

    @ApiProperty({
        description: 'Краткое название HTTP-ошибки',
        example: 'Bad Request',
    })
    error: string;
}

export class NotFoundErrorResponseDto {
    @ApiProperty({
        description: 'HTTP-код ошибки',
        example: 404,
    })
    statusCode: number;

    @ApiProperty({
        description: 'Описание ошибки',
        example: 'Пост с номером "1" не найден',
    })
    message: string;

    @ApiProperty({
        description: 'Краткое название HTTP-ошибки',
        example: 'Not Found',
    })
    error: string;
}
