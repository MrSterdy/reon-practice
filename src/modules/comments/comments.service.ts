import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { CommentDocument } from './comments.model';
import { CommentsRepository } from './comments.repository';
import { assertCommentTextValidForRating } from './validators/comment-text-by-rating.validator';

@Injectable()
export class CommentsService {
    constructor(
        private readonly commentsRepository: CommentsRepository,
        private readonly postsService: PostsService,
    ) {}

    async create(dto: CreateCommentDto): Promise<CommentDocument> {
        await this.postsService.findOne(dto.postId);
        return this.commentsRepository.create(dto);
    }

    async findAllByPostId(postId: number): Promise<CommentDocument[]> {
        await this.postsService.findOne(postId);
        return this.commentsRepository.findAllByPostId(postId);
    }

    async findOne(id: string): Promise<CommentDocument> {
        const comment = await this.commentsRepository.findById(id);
        if (!comment) {
            throw new NotFoundException(
                `Комментарий с номером "${id}" не найден`,
            );
        }
        return comment;
    }

    async update(
        id: string,
        dto: UpdateCommentDto,
    ): Promise<CommentDocument> {
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException(
                'Необходимо указать хотя бы одно поле для обновления',
            );
        }

        const existing = await this.findOne(id);
        const rating = dto.rating ?? existing.rating;
        const text = dto.text !== undefined ? dto.text : existing.text;

        assertCommentTextValidForRating(text, rating);

        const comment = await this.commentsRepository.update(id, dto);
        if (!comment) {
            throw new NotFoundException(
                `Комментарий с номером "${id}" не найден`,
            );
        }
        return comment;
    }

    async remove(id: string): Promise<void> {
        const deleted = await this.commentsRepository.remove(id);
        if (!deleted) {
            throw new NotFoundException(
                `Комментарий с номером "${id}" не найден`,
            );
        }
    }
}
