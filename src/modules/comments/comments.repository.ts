import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { Comment, CommentDocument } from './comments.model';

@Injectable()
export class CommentsRepository {
    constructor(
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
    ) {}

    create(data: CreateCommentDto): Promise<CommentDocument> {
        return this.commentModel.create(data);
    }

    findAllByPostId(postId: number): Promise<CommentDocument[]> {
        return this.commentModel.find({ postId }).sort({ createdAt: 1 }).exec();
    }

    findById(id: string): Promise<CommentDocument | null> {
        return this.commentModel.findById(id).exec();
    }

    async update(
        id: string,
        data: UpdateCommentDto,
    ): Promise<CommentDocument | null> {
        return this.commentModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.commentModel.deleteOne({ _id: id }).exec();
        return result.deletedCount > 0;
    }
}
