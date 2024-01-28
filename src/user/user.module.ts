import { Module } from '@nestjs/common'

import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller'
import { UsersService } from './user.service'
import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UserModule {}
