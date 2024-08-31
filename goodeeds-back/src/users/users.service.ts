import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async create(userDto: Omit<User, 'id'>) {
    const user = await this.prisma.user.create({ data: userDto });

    return user;
  }

  async updateUser(userId: number, updateUserDto: Partial<Omit<User, 'id'>>) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
    return user;
  }

  async deleteUser(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
