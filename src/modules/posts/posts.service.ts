import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post } from './posts.model';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    create(dto: CreatePostDto): Promise<Post> {
        return this.postsRepository.create(dto);
    }

    findAll(): Promise<Post[]> {
        return this.postsRepository.findAll();
    }

    async findOne(id: number): Promise<Post> {
        const post = await this.postsRepository.findById(id);
        if (!post) {
            throw new NotFoundException(`Пост с номером "${id}" не найден`);
        }
        return post;
    }

    async update(id: number, dto: UpdatePostDto): Promise<Post> {
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException(
                'Необходимо указать хотя бы одно поле для обновления',
            );
        }

        const post = await this.postsRepository.update(id, dto);
        if (!post) {
            throw new NotFoundException(`Пост с номером "${id}" не найден`);
        }
        return post;
    }

    async remove(id: number): Promise<void> {
        const deleted = await this.postsRepository.remove(id);
        if (!deleted) {
            throw new NotFoundException(`Пост с номером "${id}" не найден`);
        }
    }
}
