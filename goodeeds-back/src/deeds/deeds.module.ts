import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { FriendshipModule } from 'src/friendship/friendship.module';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';

@Module({
  controllers: [DeedsController],
  providers: [DeedsService],
  imports: [UsersModule, DatabaseModule, FriendshipModule],
})
export class DeedsModule {}
