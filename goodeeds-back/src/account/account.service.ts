import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { UpdateAccountDto } from 'src/dto/account.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async updateAccount(userId: number, updateAccountDto: UpdateAccountDto) {
    const { username, password } = updateAccountDto;

    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new BadRequestException('User not found ');
    }

    if (username && username !== user.username) {
      const existingUser = await this.usersService.findByUsername(username);
      if (existingUser) {
        throw new ConflictException(
          'Username is already taken by another user',
        );
      }
    }

    if (username && username === user.username) {
      throw new ConflictException(
        'New username must be different from the current one',
      );
    }

    if (password) {
      const hashedCurrentPassword = this.passwordService.getHash(
        password,
        user.salt,
      );
      if (hashedCurrentPassword === user.hash) {
        throw new ConflictException(
          'New password must be different from the current one',
        );
      }
    }

    await this.usersService.updateUser(userId, {
      username: username || undefined,
      hash: password
        ? this.passwordService.getHash(password, user.salt)
        : undefined,
    });
  }

  async deleteAccount(userId: number) {
    await this.usersService.deleteUser(userId);
    return { message: 'Account deleted successfully' };
  }
}
