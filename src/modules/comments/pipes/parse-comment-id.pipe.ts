import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class ParseCommentIdPipe implements PipeTransform<string, string> {
    transform(value: string): string {
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(
                'Номер комментария должен быть целым числом',
            );
        }

        return value;
    }
}
