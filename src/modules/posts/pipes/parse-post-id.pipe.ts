import { BadRequestException, ParseIntPipe } from '@nestjs/common';

export const ParsePostIdPipe = new ParseIntPipe({
    exceptionFactory: () =>
        new BadRequestException(
            'Номер поста должен быть целым числом',
        ),
});
