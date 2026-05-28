import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreatePostDto {
    @ApiProperty({
        description: 'Заголовок поста',
        example: 'Мой первый пост',
        minLength: 1,
        maxLength: 200,
    })
    @IsString({ message: 'Заголовок должен быть строкой' })
    @IsNotEmpty({ message: 'Заголовок обязателен' })
    @MinLength(1, { message: 'Заголовок не может быть пустым' })
    @MaxLength(200, { message: 'Заголовок не должен превышать 200 символов' })
    title: string;

    @ApiProperty({
        description: 'Текст поста',
        example: 'Содержимое поста с подробным описанием.',
        minLength: 1,
        maxLength: 1000,
    })
    @IsString({ message: 'Текст должен быть строкой' })
    @IsNotEmpty({ message: 'Текст обязателен' })
    @MinLength(1, { message: 'Текст не может быть пустым' })
    @MaxLength(1000, { message: 'Текст не должен превышать 1000 символов' })
    text: string;
}
