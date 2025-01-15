import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserCrudService {
    constructor(private prismaService: PrismaService) {}

    findMany(options: Prisma.UserFindManyArgs) {
        const { select, skip, take, cursor, where, orderBy } = options;

        return this.prismaService.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            select,
        });
    }

    findOne(user: Prisma.UserWhereInput, select?: Prisma.UserSelect) {
        return this.prismaService.user.findFirst({
            where: user,
            select,
        });
    }

    create(data: Prisma.UserCreateInput) {
        return this.prismaService.user.create({
            data,
            omit: {
                password: true
            }
        });
    }
}
