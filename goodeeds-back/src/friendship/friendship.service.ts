import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendshipService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getFriends(userId: number) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { fromUserId: userId, isPending: false },
          { toUserId: userId, isPending: false },
        ],
      },
      include: {
        fromUser: true,
        toUser: true,
      },
    });

    const friends = friendships.map((friendship) => {
      if (friendship.fromUserId === userId) {
        return friendship.toUser;
      } else {
        return friendship.fromUser;
      }
    });

    return friends;
  }

  async getIncomingFriendRequests(userId: number) {
    return this.prisma.friendship.findMany({
      where: {
        toUserId: userId,
        isPending: true,
      },
      include: {
        fromUser: true,
      },
    });
  }

  async sendFriendRequest(fromUserId: number, username: string) {
    const toUser = await this.usersService.findByUsername(username);

    if (!toUser) {
      throw new NotFoundException('Recipient user not found.');
    }

    const toUserId = toUser.id;

    if (fromUserId === toUserId) {
      throw new ConflictException(
        'You cannot send a friend request to yourself.',
      );
    }

    const incomingRequest = await this.prisma.friendship.findUnique({
      where: {
        fromUserId_toUserId: { fromUserId: toUserId, toUserId: fromUserId },
      },
    });

    if (incomingRequest) {
      if (incomingRequest.isPending) {
        throw new ConflictException(
          'You have an incoming friend request from this user.',
        );
      } else {
        throw new ConflictException('You are already friends with this user.');
      }
    }

    const existingFriendship = await this.prisma.friendship.findUnique({
      where: {
        fromUserId_toUserId: { fromUserId, toUserId },
      },
    });

    if (existingFriendship) {
      if (existingFriendship.isPending) {
        throw new ConflictException('Friend request already sent.');
      } else {
        throw new ConflictException('You are already friends with this user.');
      }
    }

    return this.prisma.friendship.create({
      data: {
        fromUserId,
        toUserId,
        isPending: true,
      },
    });
  }

  async acceptFriendRequest(fromUserId: number, toUserId: number) {
    const friendship = await this.prisma.friendship.findUnique({
      where: {
        fromUserId_toUserId: { fromUserId, toUserId },
      },
    });

    if (!friendship || !friendship.isPending) {
      throw new NotFoundException('Friend request not found.');
    }

    return this.prisma.friendship.update({
      where: {
        fromUserId_toUserId: { fromUserId, toUserId },
      },
      data: {
        isPending: false,
      },
    });
  }

  async rejectFriendRequest(fromUserId: number, toUserId: number) {
    const friendship = await this.prisma.friendship.findUnique({
      where: {
        fromUserId_toUserId: { fromUserId, toUserId },
      },
    });

    if (!friendship || !friendship.isPending) {
      throw new NotFoundException('Friend request not found.');
    }

    return this.prisma.friendship.delete({
      where: {
        fromUserId_toUserId: { fromUserId, toUserId },
      },
    });
  }
}
