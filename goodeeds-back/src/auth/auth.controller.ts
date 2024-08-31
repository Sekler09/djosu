import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateAccountDto } from 'src/dto/account.dto';
import { extractUserFromRequest } from 'src/utils/extractUserFromRequest';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('/sign-up')
  async signUp(
    @Body() body: CreateAccountDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(body);
    return this.cookieService.setToken(res, accessToken);
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: CreateAccountDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(body);
    return this.cookieService.setToken(res, accessToken);
  }

  @Post('/sign-out')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearToken(res);
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getMe(@Req() req: Request) {
    return extractUserFromRequest(req);
  }
}
