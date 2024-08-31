import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { extractUserFromRequest } from 'src/utils/extractUserFromRequest';
import { FriendshipService } from './friendship.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('friendship')
export class FriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  @Get('friends')
  async getFriends(@Req() req: Request) {
    const userId = extractUserFromRequest(req).id;
    return this.friendshipService.getFriends(userId);
  }

  @Get('requests')
  async getIncomingFriendRequests(@Req() req: Request) {
    const userId = extractUserFromRequest(req).id;
    return this.friendshipService.getIncomingFriendRequests(userId);
  }

  @Post('request/:username')
  async sendFriendRequest(
    @Req() req: Request,
    @Param('username') username: string,
  ) {
    const fromUserId = extractUserFromRequest(req).id;
    return this.friendshipService.sendFriendRequest(fromUserId, username);
  }

  @Post('accept/:fromUserId')
  async acceptFriendRequest(
    @Req() req: Request,
    @Param('fromUserId', ParseIntPipe) fromUserId: number,
  ) {
    const toUserId = extractUserFromRequest(req).id;
    return this.friendshipService.acceptFriendRequest(fromUserId, toUserId);
  }

  @Post('reject/:fromUserId')
  async rejectFriendRequest(
    @Req() req: Request,
    @Param('fromUserId', ParseIntPipe) fromUserId: number,
  ) {
    const toUserId = extractUserFromRequest(req).id;
    return this.friendshipService.rejectFriendRequest(fromUserId, toUserId);
  }
}
