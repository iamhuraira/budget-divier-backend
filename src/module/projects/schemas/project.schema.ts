import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { SubProjectsItem } from './subProjects.schema'

export type ProjectDocument = Project & Document

@Schema()
export class Project {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  admin: Types.ObjectId

  @Prop({ required: true, ref: 'User', type: Types.ObjectId })
  members: Types.ObjectId[]

  @Prop({ type: SubProjectsItem, default: [] })
  subProjects: SubProjectsItem[]

  // @Prop({ type: SubProjectsItem, default: {} })
  // subProjects1: SubProjectsItem
  //
  // @Prop({ type: SubProjectsItem, default: {} })
  // subProjects2: SubProjectsItem

  @Prop({ default: Date.now })
  createdAt: Date
}

export const ProjectSchema = SchemaFactory.createForClass(Project)
