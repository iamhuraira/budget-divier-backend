import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignupDto {
  @ApiProperty({ example: 'Abu Huraira', description: 'The name of the user.', required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty({ example: 'iamhuraira@gmail.com', description: 'The email of the user.' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string

  @ApiProperty({ example: '4123004@Abh', description: 'The password of the user.' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/^(?=.*\d)/, { message: 'Password must contain at least one number' })
  @Matches(/^(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character' })
  @Matches(/^.{8,}$/, { message: 'Password must be at least 8 characters long' })
  readonly password: string
}
