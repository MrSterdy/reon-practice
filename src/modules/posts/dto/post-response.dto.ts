import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
    @ApiProperty({
        description: 'Уникальный номер поста',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Заголовок поста',
        example: 'Мой первый пост',
        maxLength: 200,
    })
    title: string;

    @ApiProperty({
        description: 'Текст поста',
        example: 'Содержимое поста с подробным описанием',
        maxLength: 1000,
    })
    text: string;
}
