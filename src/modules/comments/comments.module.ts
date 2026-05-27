import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '../posts/posts.module';
import { CommentsController } from './comments.controller';
import { Comment, CommentSchema } from './comments.model';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
        ]),
        PostsModule,
    ],
    controllers: [CommentsController],
    providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
