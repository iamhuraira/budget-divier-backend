import { IsString } from 'class-validator'

export class TokenDto {
  @IsString()
  userId: string

  @IsString()
  accessToken: string

  @IsString()
  refreshToken: string
}

export type TokenDTOWithoutID = Omit<TokenDto, 'userId'>
