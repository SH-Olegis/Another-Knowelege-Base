import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ICreateArticle } from '../../../interfaces/entities/acrticle.interface';

export class CreateArticleDto implements ICreateArticle {
    @IsString()
    content: string;

    @IsBoolean()
    isPublic: boolean;

    @IsNumber({}, { each: true })
    tags: number[];

    @IsString()
    title: string;
}