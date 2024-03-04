import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { TokenDto } from './dto/token.dto'
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'
import { SigninDto } from './dto/signin.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: SignupDto,
    description: 'User SignUp',
  })
  /* @ApiQuery({ name: 'name', required: true, description: 'User Name' })
  @ApiQuery({ name: 'email', required: true, description: 'User Email' })
  @ApiQuery({ name: 'password', required: true, description: 'User Password' }) */
  signUp(@Body() createAuthDto: SignupDto): Promise<TokenDto> {
    return this.authService.signup(createAuthDto)
  }

  @ApiOperation({ summary: 'SignIn' })
  @Post('signin')
  signin(@Body() data: SigninDto): Promise<TokenDto> {
    return this.authService.signIn(data)
  }

  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiSecurity('JWT-auth')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request): Promise<TokenDto> {
    const { userId, refreshToken } = req.user as any
    return this.authService.refreshTokens(userId, refreshToken)
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiSecurity('JWT-auth')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    // @ts-ignore
    this.authService.logout(req.user.userId)
  }
}
