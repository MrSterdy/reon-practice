import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    Max,
    MaxLength,
    Min,
    Validate,
} from 'class-validator';
import { CommentTextByRatingConstraint } from '../validators/comment-text-by-rating.validator';

export class CreateCommentDto {
    @ApiProperty({
        description: 'Номер поста, к которому добавляется комментарий',
        example: 1,
        minimum: 1,
    })
    @IsInt({ message: 'Номер поста должен быть целым числом' })
    @IsPositive({ message: 'Номер поста должен быть положительным числом' })
    postId: number;

    @ApiPropertyOptional({
        description:
            'Текст отзыва. При оценке от 2 до 4 обязателен и должен содержать не менее 10 символов. В остальных случаях может быть пустым.',
        example: 'Отличный пост, очень полезная информация!',
        maxLength: 1000,
    })
    @IsOptional()
    @IsString({ message: 'Текст должен быть строкой' })
    @MaxLength(1000, { message: 'Текст не должен превышать 1000 символов' })
    text?: string;

    @ApiProperty({
        description:
            'Оценка поста от 1 до 5. При значениях 2–4 текст отзыва обязателен и должен содержать не менее 10 символов.',
        example: 5,
        minimum: 1,
        maximum: 5,
    })
    @Validate(CommentTextByRatingConstraint)
    @IsInt({ message: 'Оценка должна быть целым числом' })
    @Min(1, { message: 'Оценка должна быть не менее 1' })
    @Max(5, { message: 'Оценка должна быть не более 5' })
    rating: number;

    @ApiProperty({
        description: 'Имя автора комментария',
        example: 'Иван',
        maxLength: 100,
    })
    @IsString({ message: 'Автор должен быть строкой' })
    @IsNotEmpty({ message: 'Автор обязателен' })
    @MaxLength(100, { message: 'Имя автора не должно превышать 100 символов' })
    author: string;
}
