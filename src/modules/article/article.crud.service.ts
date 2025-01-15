import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-articles.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleCrudService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createArticleDto: CreateArticleDto, userId: number) {
        return this.prismaService.article.create({
            data: {
                ...createArticleDto,
                authorId: userId,
                tags: {
                    connect: createArticleDto.tags.map((tagId) => ({id: tagId}))
                },
            },
        });
    }

    async findAll(where: Prisma.ArticleWhereInput) {
        return this.prismaService.article.findMany({
            where,
            include: { tags: true },
        });
    }

    async findOne(id: number, userId: number | undefined, select: Prisma.ArticleSelect) {
        return this.prismaService.article.findFirst({
            where: { id, isPublic: !userId },
            select,
        });
    }

    async update(id: number, updateArticleDto: UpdateArticleDto) {
        return this.prismaService.article.update({
            where: { id },
            data: {
                ...updateArticleDto,
                tags: {
                    set: updateArticleDto.tags.map(tagId => ({ id: tagId })),
                },
            },
        });
    }

    async remove(id: number) {
        return this.prismaService.article.delete({
            where: { id },
        });
    }
}