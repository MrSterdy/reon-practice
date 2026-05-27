import {
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateCommentDto {
    @IsInt({ message: 'Номер поста должен быть целым числом' })
    @IsPositive({ message: 'Номер поста должен быть положительным числом' })
    postId: number;

    @IsString({ message: 'Текст должен быть строкой' })
    @IsNotEmpty({ message: 'Текст обязателен' })
    @MinLength(1, { message: 'Текст не может быть пустым' })
    @MaxLength(1000, { message: 'Текст не должен превышать 1000 символов' })
    text: string;

    @IsInt({ message: 'Оценка должна быть целым числом' })
    @Min(1, { message: 'Оценка должна быть не менее 1' })
    @Max(5, { message: 'Оценка должна быть не более 5' })
    rating: number;

    @IsString({ message: 'Автор должен быть строкой' })
    @IsNotEmpty({ message: 'Автор обязателен' })
    @MinLength(1, { message: 'Автор не может быть пустым' })
    @MaxLength(100, { message: 'Имя автора не должно превышать 100 символов' })
    author: string;
}
