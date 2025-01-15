import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtCookieAuthGuard } from '../../guards/jwt-cookie-auth.guard';
import { CurrentUser } from '../../decorators/user.decorator';
import { ILoggedUser } from '../../interfaces/entities/user.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-articles.dto';
import { ArticleQueryDto } from './dto/article.query.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @UseGuards(JwtCookieAuthGuard)
  @Post()
  create(
      @Body() createArticleDto: CreateArticleDto,
      @CurrentUser() user: ILoggedUser
  ) {
    return this.articlesService.createArticle(createArticleDto, user.id);
  }

  @Get()
  findAll(
      @Query() query: ArticleQueryDto,
      @CurrentUser() user?: ILoggedUser
  ) {
    const filterTags = query?.filter?.tags;

    return this.articlesService.listArticles({
      tags: filterTags
    }, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: ILoggedUser) {
    return this.articlesService.getArticle(id, user?.id);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Put(':id')
  update(
      @Param('id', ParseIntPipe) articleId: number,
      @Body() updateArticleDto: UpdateArticleDto,
      @CurrentUser() user: ILoggedUser
  ) {
    return this.articlesService.updateArticle(user.id, articleId, updateArticleDto);
  }

  @UseGuards(JwtCookieAuthGuard)
  @Delete(':id')
  remove(
      @Param('id', ParseIntPipe) id: number,
      @CurrentUser() user: ILoggedUser,
  ) {
    return this.articlesService.deleteArticle(user.id, id);
  }
}