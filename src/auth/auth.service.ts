import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

import { JwtService } from '@nestjs/jwt'
import { User } from './schemas/user.schema'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { SignupDto } from './dto/signup.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    })
    const token = this.jwtService.sign({ id: user._id })
    return { token }
  }
}
