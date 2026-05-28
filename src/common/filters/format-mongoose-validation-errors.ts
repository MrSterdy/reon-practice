import { Error as MongooseError } from 'mongoose';

export function formatMongooseValidationErrors(
    exception: MongooseError.ValidationError,
): string[] {
    return Object.values(exception.errors).map((err) => {
        if (err.kind === 'required') {
            return `Поле "${String(err.path)}" обязательно`;
        }

        return err.message;
    });
}
