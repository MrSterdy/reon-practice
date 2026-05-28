import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import {
    BadRequestErrorResponseDto,
    NotFoundErrorResponseDto,
    ValidationErrorResponseDto,
} from '../../common/swagger/dto/api-error-response.dto';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto';
import { ParsePostIdPipe } from './pipes/parse-post-id.pipe';
import { Post as PostEntity } from './posts.model';
import { PostsService } from './posts.service';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    @ApiOperation({
        summary: 'Создать пост',
        description: 'Создаёт новый пост',
    })
    @ApiCreatedResponse({
        description: 'Пост успешно создан',
        type: PostResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Ошибка валидации входных данных',
        type: ValidationErrorResponseDto,
    })
    create(@Body() dto: CreatePostDto): Promise<PostEntity> {
        return this.postsService.create(dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Получить все посты',
        description: 'Возвращает список всех постов',
    })
    @ApiOkResponse({
        description: 'Список постов',
        type: PostResponseDto,
        isArray: true,
    })
    findAll(): Promise<PostEntity[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Получить пост по номеру',
        description: 'Возвращает один пост по его номеру',
    })
    @ApiParam({
        name: 'id',
        description: 'Номер поста',
        example: 1,
        type: Number,
    })
    @ApiOkResponse({
        description: 'Пост найден',
        type: PostResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Некорректный номер поста',
        type: BadRequestErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Пост не найден',
        type: NotFoundErrorResponseDto,
    })
    findOne(@Param('id', ParsePostIdPipe) id: number): Promise<PostEntity> {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Обновить пост',
        description: 'Частично обновляет пост',
    })
    @ApiParam({
        name: 'id',
        description: 'Номер поста',
        example: 1,
        type: Number,
    })
    @ApiOkResponse({
        description: 'Пост успешно обновлён',
        type: PostResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Ошибка валидации, пустое тело запроса или некорректный номер поста',
        type: ValidationErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Пост не найден',
        type: NotFoundErrorResponseDto,
    })
    update(@Param('id', ParsePostIdPipe) id: number, @Body() dto: UpdatePostDto): Promise<PostEntity> {
        return this.postsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Удалить пост',
        description: 'Удаляет пост по его номеру',
    })
    @ApiParam({
        name: 'id',
        description: 'Номер поста',
        example: 1,
        type: Number,
    })
    @ApiNoContentResponse({
        description: 'Пост успешно удалён',
    })
    @ApiBadRequestResponse({
        description: 'Некорректный номер поста',
        type: BadRequestErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Пост не найден',
        type: NotFoundErrorResponseDto,
    })
    remove(@Param('id', ParsePostIdPipe) id: number): Promise<void> {
        return this.postsService.remove(id);
    }
}
