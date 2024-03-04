import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument, UserSearch } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.UserModel(createUserDto)
    return createdUser.save()
  }

  async findAll(): Promise<UserDocument[]> {
    return this.UserModel.find().exec()
  }

  async findById(id: string): Promise<UserDocument> {
    return this.UserModel.findById(id)
  }

  async searchUsers(query: string): Promise<UserSearch[]> {
    const users = await this.UserModel.find({
      name: { $regex: new RegExp(query, 'i') },
    }).exec()
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })
  }

  async findByUserEmail(email: string): Promise<UserDocument> {
    return this.UserModel.findOne({ email }).exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec()
  }

  async remove(id: string): Promise<UserDocument> {
    return this.UserModel.findByIdAndDelete(id).exec()
  }
}
