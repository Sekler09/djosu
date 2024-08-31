import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UsersModule, AuthModule],
})
export class AccountModule {}
