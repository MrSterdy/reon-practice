import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class FindCommentsQueryDto {
    @ApiProperty({
        description: 'Номер поста для получения списка комментариев',
        example: 1,
        minimum: 1,
    })
    @Type(() => Number)
    @IsInt({ message: 'Номер поста должен быть целым числом' })
    @IsPositive({ message: 'Номер поста должен быть положительным числом' })
    postId: number;
}
