import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class CreateBudgetDto {
  @ApiProperty({ example: 'Field Thaika', description: 'Budget Name' })
  @IsString()
  @IsNotEmpty()
  budget_name: string

  @ApiProperty({ example: 3000, description: 'Total Amount' })
  @IsNumber()
  @IsNotEmpty()
  amount: number

  @ApiProperty({ example: '6123004a5b3b1b0c5c1d8e4f', description: 'Budget Created By: ' })
  @IsNotEmpty()
  generate_by: string

  @ApiProperty({
    example: {
      '6123004a5b3b1b0c5c1d8e4f': 1000,
      '65b77d8a2e6b590d2c852cf4': 1000,
      '65b4f5743ac0c229ad0b4a01': 1000,
    },
    description: 'User Contributions',
  })
  @IsNotEmpty()
  userContributions: Record<string, number>
}
