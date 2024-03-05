import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Model } from 'mongoose'
import { SignupDto } from './dto/signup.dto'
import { UsersService } from '../user/user.service'
import { TokenDto, TokenDTOWithoutID } from './dto/token.dto'
import { User, UserDocument } from '../user/schemas/user.schema'
import { SigninDto } from './dto/signin.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(JwtService) private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async signup(signUpDto: SignupDto): Promise<TokenDto> {
    // Check if user exists
    const userExists = await this.usersService.findByUserEmail(signUpDto.email)
    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    const hash = await this.hashData(signUpDto.password)
    const newUser = await this.usersService.create({
      ...signUpDto,
      password: hash,
    })
    const tokens = await this.getTokens(newUser._id, newUser.email)
    await this.updateRefreshToken(newUser._id, tokens.refreshToken)
    return { userId: newUser._id, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken)
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    })
  }

  async signIn(data: SigninDto): Promise<TokenDto> {
    // Check if user exists
    const user = await this.usersService.findByUserEmail(data.email)
    if (!user) throw new BadRequestException('User does not exist')
    const passwordMatches = await argon2.verify(user.password, data.password)
    if (!passwordMatches) throw new BadRequestException('Password is incorrect')
    const tokens = await this.getTokens(user._id, user.email)
    await this.updateRefreshToken(user._id, tokens.refreshToken)
    return { userId: user._id, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
  }

  // eslint-disable-next-line class-methods-use-this
  hashData(data: string): Promise<string> {
    return argon2.hash(data)
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null })
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<TokenDTOWithoutID> {
    const user = await this.usersService.findById(userId)
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied')
    }
    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken)
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied')
    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async getTokens(userId: string, username: string): Promise<TokenDTOWithoutID> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '30m',
        },
      ),
      this.jwtService.sign(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }
}
