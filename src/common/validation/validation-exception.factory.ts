import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { formatValidationErrors } from './format-validation-errors';

export function validationExceptionFactory(
    errors: ValidationError[],
): BadRequestException {
    return new BadRequestException(formatValidationErrors(errors));
}
