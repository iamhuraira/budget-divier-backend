import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project, ProjectDocument } from './schemas/project.schema'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { BudgetItem } from './schemas/budget.schema'

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private ProjectModel: Model<ProjectDocument>) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    return new this.ProjectModel(createProjectDto).save()
  }

  async findAll(): Promise<ProjectDocument[]> {
    return this.ProjectModel.find().exec()
  }

  async createSubProjects(id: string, createBudgetDto: CreateBudgetDto) {
    const project = await this.ProjectModel.findById(id).exec()

    const obj = createBudgetDto.userContributions

    Object.keys(obj).forEach((key) => {
      obj[key] /= 2
    })

    const budgetItem = new BudgetItem({
      budget_name: createBudgetDto.budget_name,
      amount: createBudgetDto.amount / 2,
      generate_by: createBudgetDto.generate_by,
      userContributions: obj,
    })

    const subProject = {
      _id: new Types.ObjectId(),
      subProject_name: project?.name,
      budget: [{ _id: new Types.ObjectId(), ...budgetItem }],
    }

    const subProject1 = { ...subProject, subProject_name: `${project.name} - 1` }
    const subProject2 = { ...subProject, subProject_name: `${project.name} - 2` }

    const result = await this.ProjectModel.findByIdAndUpdate(
      id,
      { $push: { subProjects: { $each: [subProject1, subProject2] } } },
      { new: true },
    ).exec()

    return {
      status: 200,
      message: 'Sub-Projects Created Successfully',
      data: result,
    }
  }

  async addNewExpense(projectId: string, subProjectId: string, createBudgetDto: CreateBudgetDto) {
    const project = await this.ProjectModel.findById(projectId).exec()

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    const budgetItem = {
      budget_name: createBudgetDto.budget_name,
      amount: createBudgetDto.amount,
      generate_by: createBudgetDto.generate_by,
      userContributions: createBudgetDto.userContributions,
    }

    const subProjectIndex = project.subProjects.findIndex((subProject) => subProject._id.toString() === subProjectId)

    if (subProjectIndex === -1) {
      throw new HttpException('Invalid subProjectId', HttpStatus.BAD_REQUEST)
    }

    const update = { $push: { [`subProjects.${subProjectIndex}.budget`]: budgetItem } }

    const result = await this.ProjectModel.updateOne({ _id: projectId }, update)

    if (result.modifiedCount === 0) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    return {
      status: 200,
      message: 'New Expense Added Successfully',
    }
  }

  async addNewProfit(projectId: string, subProjectId: string, createBudgetDto: CreateBudgetDto) {
    const project = await this.ProjectModel.findById(projectId).exec()

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    const budgetItem = {
      budget_name: createBudgetDto.budget_name,
      amount: createBudgetDto.amount,
      generate_by: createBudgetDto.generate_by,
      userContributions: createBudgetDto.userContributions,
    }

    const subProjectIndex = project.subProjects.findIndex((subProject) => subProject._id.toString() === subProjectId)

    if (subProjectIndex === -1) {
      throw new HttpException('Invalid subProjectId', HttpStatus.BAD_REQUEST)
    }

    const update = { $push: { [`subProjects.${subProjectIndex}.budget`]: budgetItem } }

    const result = await this.ProjectModel.updateOne({ _id: projectId }, update)

    if (result.modifiedCount === 0) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
    }

    return {
      status: 200,
      message: 'New Expense Added Successfully',
    }
  }

  async findOne(id: string) {
    return this.ProjectModel.findById(id).exec()
  }

  async deleteAll() {
    await this.ProjectModel.deleteMany({}).exec()
    return {
      status: 200,
      message: 'All Projects Deleted Successfully',
    }
  }

  async remove(id: string) {
    await this.ProjectModel.findByIdAndDelete(id).exec()
    return {
      status: 200,
      message: 'Project Deleted Successfully',
    }
  }
}
