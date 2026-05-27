import { BadRequestException } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

const MIDDLE_RATING_MIN_TEXT_LENGTH = 10;
const MIDDLE_RATING_START = 2;
const MIDDLE_RATING_END = 4;

export const COMMENT_TEXT_BY_RATING_MESSAGE =
    `При оценке от ${MIDDLE_RATING_START} до ${MIDDLE_RATING_END} текст отзыва обязателен и должен содержать не менее ${MIDDLE_RATING_MIN_TEXT_LENGTH} символов`;

export function isCommentTextValidForRating(
    text: string | undefined | null,
    rating: number,
): boolean {
    if (rating >= MIDDLE_RATING_START && rating <= MIDDLE_RATING_END) {
        return (
            typeof text === 'string' &&
            text.length >= MIDDLE_RATING_MIN_TEXT_LENGTH
        );
    }

    return (
        text === undefined ||
        text === null ||
        text === '' ||
        typeof text === 'string'
    );
}

export function assertCommentTextValidForRating(
    text: string | undefined | null,
    rating: number,
): void {
    if (!isCommentTextValidForRating(text, rating)) {
        throw new BadRequestException(COMMENT_TEXT_BY_RATING_MESSAGE);
    }
}

interface CommentTextByRatingPayload {
    text?: string;
    rating?: number;
    postId?: number;
}

@ValidatorConstraint({ name: 'commentTextByRating', async: false })
export class CommentTextByRatingConstraint
    implements ValidatorConstraintInterface {
    validate(_value: unknown, args: ValidationArguments): boolean {
        const payload = args.object as CommentTextByRatingPayload;
        const { text, rating } = payload;

        if (rating === undefined) {
            return true;
        }

        const isCreate =
            payload.postId !== undefined && payload.postId !== null;

        if (!isCreate && text === undefined) {
            return true;
        }

        return isCommentTextValidForRating(text ?? '', rating);
    }

    defaultMessage(): string {
        return COMMENT_TEXT_BY_RATING_MESSAGE;
    }
}
