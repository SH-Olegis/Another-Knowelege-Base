import { ITag } from './tag.interface';

export interface IArticle {
    id: number
    title: string
    content: string
    isPublic: boolean
    authorId: number
    createdAt: Date
    updatedAt: Date
    tags: ITag[]
}

export interface ICreateArticle extends Pick<IArticle, 'content' | 'title' | 'isPublic'> {
    tags: number[]
}