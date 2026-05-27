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
    @IsInt({ message: 'Номер поста должен быть целым числом' })
    @IsPositive({ message: 'Номер поста должен быть положительным числом' })
    postId: number;

    @IsOptional()
    @IsString({ message: 'Текст должен быть строкой' })
    @MaxLength(1000, { message: 'Текст не должен превышать 1000 символов' })
    text?: string;

    @Validate(CommentTextByRatingConstraint)
    @IsInt({ message: 'Оценка должна быть целым числом' })
    @Min(1, { message: 'Оценка должна быть не менее 1' })
    @Max(5, { message: 'Оценка должна быть не более 5' })
    rating: number;

    @IsString({ message: 'Автор должен быть строкой' })
    @IsNotEmpty({ message: 'Автор обязателен' })
    @MaxLength(100, { message: 'Имя автора не должно превышать 100 символов' })
    author: string;
}
