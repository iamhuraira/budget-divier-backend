import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SigninDto {
  @ApiProperty({ example: 'iamhuraira@gmail.com', description: 'The email of the user.' })
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: '4123004@Abh', description: 'The password of the user.' })
  @IsString()
  @IsNotEmpty()
  password: string
}
