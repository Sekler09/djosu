import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { DeedsModule } from './deeds/deeds.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    AccountModule,
    DeedsModule,
    FriendshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
