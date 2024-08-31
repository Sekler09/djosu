import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CookieService } from './cookie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.key];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const userInfo = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersService.findUserById(userInfo?.id);
      if (!user) throw new UnauthorizedException();
      req['user'] = {
        id: user.id,
        username: user.username,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
