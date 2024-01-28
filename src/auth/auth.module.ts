import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { AccessTokenStrategy } from './strategies/accessToken.strategy'
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy'

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
