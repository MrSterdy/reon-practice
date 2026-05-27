import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.model';

@Injectable()
export class PostsRepository {
    constructor(
        @InjectRepository(Post)
        private readonly repository: Repository<Post>,
    ) {}

    create(data: Pick<Post, 'title' | 'text'>): Promise<Post> {
        const post = this.repository.create(data);
        return this.repository.save(post);
    }

    findAll(): Promise<Post[]> {
        return this.repository.find({ order: { id: 'ASC' } });
    }

    findById(id: number): Promise<Post | null> {
        return this.repository.findOne({ where: { id } });
    }

    async update(
        id: number,
        data: Partial<Pick<Post, 'title' | 'text'>>,
    ): Promise<Post | null> {
        const post = await this.findById(id);
        if (!post) {
            return null;
        }

        Object.assign(post, data);
        return this.repository.save(post);
    }

    async remove(id: number): Promise<boolean> {
        const result = await this.repository.delete({ id });
        return (result.affected ?? 0) > 0;
    }
}
