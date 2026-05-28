import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
    @ApiProperty({
        description: 'Уникальный номер комментария',
        example: '507f1f77bcf86cd799439011',
    })
    _id: string;

    @ApiProperty({
        description: 'Номер поста, к которому относится комментарий',
        example: 1,
    })
    postId: number;

    @ApiProperty({
        description:
            'Текст отзыва. При оценке от 2 до 4 обязателен и должен содержать не менее 10 символов. В остальных случаях может быть пустым',
        example: 'Отличный пост, очень полезная информация!',
        maxLength: 1000,
    })
    text: string;

    @ApiProperty({
        description: 'Оценка поста от 1 до 5',
        minimum: 1,
        maximum: 5,
        example: 5,
    })
    rating: number;

    @ApiProperty({
        description: 'Имя автора комментария',
        example: 'Иван',
        maxLength: 100,
    })
    author: string;

    @ApiProperty({
        description: 'Дата и время создания комментария',
        example: '2026-05-27T12:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Дата и время последнего обновления комментария',
        example: '2026-05-27T12:00:00.000Z',
    })
    updatedAt: Date;
}
