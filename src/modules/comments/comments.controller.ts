import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateCommentDto, FindCommentsQueryDto, UpdateCommentDto } from './dto';
import { CommentDocument } from './comments.model';
import { CommentsService } from './comments.service';
import { ParseCommentIdPipe } from './pipes/parse-comment-id.pipe';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    create(@Body() dto: CreateCommentDto): Promise<CommentDocument> {
        return this.commentsService.create(dto);
    }

    @Get()
    findAllByPostId(
        @Query() query: FindCommentsQueryDto,
    ): Promise<CommentDocument[]> {
        return this.commentsService.findAllByPostId(query.postId);
    }

    @Get(':id')
    findOne(
        @Param('id', ParseCommentIdPipe) id: string,
    ): Promise<CommentDocument> {
        return this.commentsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseCommentIdPipe) id: string,
        @Body() dto: UpdateCommentDto,
    ): Promise<CommentDocument> {
        return this.commentsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseCommentIdPipe) id: string): Promise<void> {
        return this.commentsService.remove(id);
    }
}
