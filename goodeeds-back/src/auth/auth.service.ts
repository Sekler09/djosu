import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateAccountDto } from 'src/dto/account.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp({ username, password }: CreateAccountDto) {
    const user = await this.usersService.findByUsername(username);

    if (user) {
      throw new BadRequestException({
        username: 'User with such name already exists',
      });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.usersService.create({ username, salt, hash });

    const accessToken = await this.jwtService.signAsync({
      id: newUser.id,
      username: newUser.username,
    });
    return { accessToken };
  }

  async signIn({ username, password }: CreateAccountDto) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }
    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });
    return { accessToken };
  }
}
