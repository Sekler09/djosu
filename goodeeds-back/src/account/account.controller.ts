import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateAccountDto } from 'src/dto/account.dto';
import { extractUserFromRequest } from 'src/utils/extractUserFromRequest';
import { AccountService } from './account.service';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/me')
  getMe(@Req() req: Request) {
    const user = extractUserFromRequest(req);
    return user;
  }

  @Patch()
  updateAccount(
    @Req() req: Request,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    const userId = extractUserFromRequest(req).id;
    return this.accountService.updateAccount(userId, updateAccountDto);
  }

  @Delete()
  deleteAccount(@Req() req: Request) {
    const userId = extractUserFromRequest(req).id;
    return this.accountService.deleteAccount(userId);
  }
}
