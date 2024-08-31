import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
  Post,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateDeedDto, UpdateDeedDto } from 'src/dto/deeds.dto';
import { extractUserFromRequest } from 'src/utils/extractUserFromRequest';
import { PaginationDto } from 'src/dto/common';
import { DeedsService } from './deeds.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('deeds')
export class DeedsController {
  constructor(private readonly deedsService: DeedsService) {}

  @Get()
  async getDeeds(@Req() req: Request, @Query() query: PaginationDto) {
    const userId = extractUserFromRequest(req).id;
    return this.deedsService.getUserDeeds(userId, query);
  }

  @Get('friends')
  async getFriendsDeeds(@Req() req: Request, @Query() query: PaginationDto) {
    const userId = extractUserFromRequest(req).id;
    return this.deedsService.getFriendsDeeds(userId, query);
  }

  @Get(':id')
  async getDeedById(@Req() req: Request, @Param('id') id: string) {
    const userId = extractUserFromRequest(req).id;
    return this.deedsService.getDeedById(userId, +id);
  }

  @Post()
  async createDeed(@Req() req: Request, @Body() createDeedDto: CreateDeedDto) {
    const userId = extractUserFromRequest(req).id;
    return this.deedsService.createDeed(userId, createDeedDto);
  }

  @Patch(':id')
  async updateDeed(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateDeedDto: UpdateDeedDto,
  ) {
    const userId = extractUserFromRequest(req).id;
    return this.deedsService.updateDeed(userId, +id, updateDeedDto);
  }

  @Delete(':id')
  async deleteDeed(@Req() req: Request, @Param('id') id: string) {
    const userId = extractUserFromRequest(req).id;
    return this.deedsService.deleteDeed(userId, +id);
  }
}
