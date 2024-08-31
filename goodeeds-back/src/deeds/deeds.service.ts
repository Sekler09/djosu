import { Injectable, NotFoundException } from '@nestjs/common';
import { Deed } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDto } from 'src/dto/common';
import { CreateDeedDto, UpdateDeedDto } from 'src/dto/deeds.dto';
import { FriendshipService } from 'src/friendship/friendship.service';

@Injectable()
export class DeedsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly friendshipService: FriendshipService,
  ) {}

  async getUserDeeds(userId: number, { page, limit }: PaginationDto) {
    const [deeds, totalCount] = await Promise.all([
      this.prisma.deed.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { username: true, id: true } } },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.deed.count({ where: { userId } }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    return { items: deeds, totalPages, totalCount };
  }

  async getFriendsDeeds(userId: number, { page, limit }: PaginationDto) {
    const friendsIds = (await this.friendshipService.getFriends(userId)).map(
      ({ id }) => id,
    );

    const [deeds, totalCount] = await Promise.all([
      this.prisma.deed.findMany({
        where: {
          userId: {
            in: friendsIds,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: { user: { select: { username: true, id: true } } },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.deed.count({
        where: {
          userId: {
            in: friendsIds,
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    return { items: deeds, totalPages, totalCount };
  }

  async getDeedById(userId: number, deedId: number) {
    const deed = await this.prisma.deed.findFirst({
      where: { id: deedId, userId },
      include: { user: { select: { username: true, id: true } } },
    });

    return deed;
  }

  async createDeed(
    userId: number,
    createDeedDto: CreateDeedDto,
  ): Promise<Deed> {
    return this.prisma.deed.create({
      data: {
        ...createDeedDto,
        userId,
      },
    });
  }

  async updateDeed(
    userId: number,
    deedId: number,
    updateDeedDto: UpdateDeedDto,
  ) {
    const deed = await this.getDeedById(userId, deedId);

    if (!deed) {
      throw new NotFoundException('Deed not found');
    }

    return this.prisma.deed.update({
      where: { id: deed.id },
      data: {
        ...updateDeedDto,
      },
    });
  }

  async deleteDeed(userId: number, deedId: number) {
    const deed = await this.getDeedById(userId, deedId);

    if (!deed) {
      throw new NotFoundException('Deed not found');
    }

    return this.prisma.deed.delete({
      where: { id: deed.id },
    });
  }
}
