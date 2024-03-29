import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document
export type UserSearch = Omit<User, 'password' | 'refreshToken'>

@Schema()
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true, match: /.+@.+\..+/ })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  refreshToken: string
}

export const UserSchema = SchemaFactory.createForClass(User)
