import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true })
    public postId: number;

    @Prop({ default: '' })
    public text: string;

    @Prop({ required: true })
    public rating: number;

    @Prop({ required: true })
    public author: string;
}

export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
