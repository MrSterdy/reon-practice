import { ValidationError } from 'class-validator';

const WHITELIST_VALIDATION = 'whitelistValidation';

export function formatValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = [];

    for (const error of errors) {
        if (error.constraints) {
            for (const [key, message] of Object.entries(error.constraints)) {
                if (key === WHITELIST_VALIDATION) {
                    messages.push(`Поле "${error.property}" не разрешено`);
                } else {
                    messages.push(message);
                }
            }
        }

        if (error.children?.length) {
            messages.push(...formatValidationErrors(error.children));
        }
    }

    return messages;
}
