import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
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
import { CommentResponseDto, CreateCommentDto, FindCommentsQueryDto, UpdateCommentDto } from './dto';
import { CommentDocument } from './comments.model';
import { CommentsService } from './comments.service';
import { ParseCommentIdPipe } from './pipes/parse-comment-id.pipe';

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @ApiOperation({
        summary: 'Создать комментарий',
        description: 'Создаёт комментарий к существующему посту',
    })
    @ApiCreatedResponse({
        description: 'Комментарий успешно создан',
        type: CommentResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Ошибка валидации или нарушение правила текста при средней оценке',
        type: ValidationErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Пост с указанным номером не найден',
        type: NotFoundErrorResponseDto,
    })
    create(@Body() dto: CreateCommentDto): Promise<CommentDocument> {
        return this.commentsService.create(dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Получить комментарии поста',
        description: 'Возвращает все комментарии, связанные с указанным постом',
    })
    @ApiOkResponse({
        description: 'Список комментариев поста',
        type: CommentResponseDto,
        isArray: true,
    })
    @ApiBadRequestResponse({
        description: 'Некорректный номер поста',
        type: ValidationErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Пост с указанным номером не найден',
        type: NotFoundErrorResponseDto,
    })
    findAllByPostId(@Query() query: FindCommentsQueryDto): Promise<CommentDocument[]> {
        return this.commentsService.findAllByPostId(query.postId);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Получить комментарий по номеру',
        description: 'Возвращает один комментарий по его номеру',
    })
    @ApiParam({
        name: 'id',
        description: 'Номер комментария',
        example: '507f1f77bcf86cd799439011',
    })
    @ApiOkResponse({
        description: 'Комментарий найден',
        type: CommentResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Некорректный номер комментария',
        type: BadRequestErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Комментарий не найден',
        type: NotFoundErrorResponseDto,
    })
    findOne(@Param('id', ParseCommentIdPipe) id: string): Promise<CommentDocument> {
        return this.commentsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Обновить комментарий',
        description:
            'Частично обновляет комментарий',
    })
    @ApiParam({
        name: 'id',
        description: 'Номер комментария',
        example: '507f1f77bcf86cd799439011',
    })
    @ApiOkResponse({
        description: 'Комментарий успешно обновлён',
        type: CommentResponseDto,
    })
    @ApiBadRequestResponse({
        description: 'Ошибка валидации, пустое тело запроса, некорректный номер комментария или нарушение правила текста при средней оценке',
        type: ValidationErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Комментарий не найден',
        type: NotFoundErrorResponseDto,
    })
    update(@Param('id', ParseCommentIdPipe) id: string, @Body() dto: UpdateCommentDto): Promise<CommentDocument> {
        return this.commentsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Удалить комментарий',
        description: 'Удаляет комментарий по его номеру',
    })
    @ApiParam({
        name: 'id',
        description: 'Номер комментария',
        example: '507f1f77bcf86cd799439011',
    })
    @ApiNoContentResponse({
        description: 'Комментарий успешно удалён',
    })
    @ApiBadRequestResponse({
        description: 'Некорректный номер комментария',
        type: BadRequestErrorResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Комментарий не найден',
        type: NotFoundErrorResponseDto,
    })
    remove(@Param('id', ParseCommentIdPipe) id: string): Promise<void> {
        return this.commentsService.remove(id);
    }
}
