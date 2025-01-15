import { Injectable, ForbiddenException } from '@nestjs/common';
import { ArticleCrudService } from './article.crud.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-articles.dto';
import { ILoggedUser } from '../../interfaces/entities/user.interface';

@Injectable()
export class ArticleService {
  constructor(private readonly articlesCrudService: ArticleCrudService) {}

  async createArticle(createArticleDto: CreateArticleDto, userId: number) {
    return this.articlesCrudService.create(createArticleDto, userId);
  }

  async getArticle(id: number, userId: number | undefined) {
    return this.articlesCrudService.findOne(id, userId, {
      id: true,
      content: true,
      title: true,
      authorId: true,
      isPublic: true,
      tags: {
        select: {
          id: true,
          name: true
        }
      }
    })
  }

  async listArticles(filters: { tags: number[] }, user: ILoggedUser) {
    return this.articlesCrudService.findAll({
      isPublic: !user?.id,
      tags: {
        some: {
          id: {
            in: filters.tags
          }
        }
      }
    });
  }

  async updateArticle(
    userId: number,
    id: number,
    data: UpdateArticleDto,
  ) {
    const article = await this.articlesCrudService.findOne(id, userId,{
      id: true,
      authorId: true
    });

    if (!article) {
      return null;
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('Попытка обновить не свою статью');
    }

    return this.articlesCrudService.update(id, data);
  }

  async deleteArticle(userId: number, id: number) {
    const article = await this.articlesCrudService.findOne(id, userId,{
      id: true,
      authorId: true
    });

    if (!article) {
      return null;
    }

    if (article.authorId !== userId) {
      throw new ForbiddenException('Попытка удалить не свою статью');
    }

    return this.articlesCrudService.remove(id)
  }
}
