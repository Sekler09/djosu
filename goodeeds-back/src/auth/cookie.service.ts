import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  static key = 'access-token';

  setToken(res: Response, token: string) {
    res.cookie(CookieService.key, token, {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  clearToken(res: Response) {
    res.clearCookie(CookieService.key);
  }
}
