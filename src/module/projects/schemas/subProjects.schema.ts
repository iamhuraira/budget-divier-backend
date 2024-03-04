import { Prop } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { BudgetItem } from './budget.schema'

export class SubProjectsItem {
  @Prop({ type: Types.ObjectId, required: true })
  _id: Types.ObjectId

  @Prop({ required: true })
  subProject_name: string

  @Prop({ type: [BudgetItem], default: [] })
  budget: BudgetItem[]
}
