import { Prop } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export class BudgetItem {
  @Prop({ required: true })
  budget_name: string

  @Prop({ required: true })
  amount: number

  @Prop({ required: true })
  generate_by: string

  @Prop({ type: Map, of: Number })
  userContributions: Record<string, number>

  @Prop({ default: Date.now })
  createdAt: Date

  constructor({
    budget_name,
    amount,
    generate_by,
    userContributions,
  }: {
    budget_name: string
    amount: number
    generate_by: string
    userContributions: Record<string, number>
  }) {
    this.budget_name = budget_name
    this.amount = amount
    this.generate_by = generate_by
    this.userContributions = userContributions
    this.createdAt = new Date()
  }
}
