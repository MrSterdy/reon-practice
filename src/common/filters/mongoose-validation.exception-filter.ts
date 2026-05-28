import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
} from '@nestjs/common';
import { Error as MongooseError } from 'mongoose';
import { formatMongooseValidationErrors } from './format-mongoose-validation-errors';

@Catch(MongooseError.ValidationError)
export class MongooseValidationExceptionFilter implements ExceptionFilter {
    catch(exception: MongooseError.ValidationError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const body = new BadRequestException(
            formatMongooseValidationErrors(exception),
        ).getResponse();

        response.status(400).json(body);
    }
}
