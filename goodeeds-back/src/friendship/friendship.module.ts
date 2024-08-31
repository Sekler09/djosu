import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService],
  imports: [AuthModule, DatabaseModule, UsersModule],
  exports: [FriendshipService],
})
export class FriendshipModule {}
