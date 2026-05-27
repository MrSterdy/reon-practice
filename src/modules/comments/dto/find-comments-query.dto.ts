import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class FindCommentsQueryDto {
    @Type(() => Number)
    @IsInt({ message: 'Номер поста должен быть целым числом' })
    @IsPositive({ message: 'Номер поста должен быть положительным числом' })
    postId: number;
}
