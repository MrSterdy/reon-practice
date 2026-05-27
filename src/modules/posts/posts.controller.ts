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
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto';
import { ParsePostIdPipe } from './pipes/parse-post-id.pipe';
import { Post as PostEntity } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    create(@Body() dto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.create(dto);
    }

    @Get()
    findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParsePostIdPipe) id: number): Promise<PostEntity> {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParsePostIdPipe) id: number,
        @Body() dto: UpdatePostDto,
    ): Promise<PostEntity> {
        return this.postsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParsePostIdPipe) id: number): Promise<void> {
        return this.postsService.remove(id);
    }
}
