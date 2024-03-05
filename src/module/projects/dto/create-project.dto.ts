import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProjectDto {
  @ApiProperty({ example: 'Field Year 2024-2025', description: 'Project Name Example' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: '6123004a5b3b1b0c5c1d8e4f', description: 'Admin Id Example' })
  @IsNotEmpty({ message: 'Admin Id is required' })
  admin: string

  @ApiProperty({
    example: '[6123004a5b3b1b0c5c1d8e4f, 6123004a5b3b1b0c5c1d8e4f, 6123004a5b3b1b0c5c1d8e4f]',
    description: 'Members Id Example in Array',
  })
  @IsNotEmpty()
  members: string[]
}
