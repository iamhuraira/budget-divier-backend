import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { ProjectsService } from './projects.service'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'
import { AccessTokenGuard } from '../../common/guards/accessToken.guard'
import { CreateBudgetDto } from './dto/create-budget.dto'

// @ApiSecurity('JWT-auth')
// @UseGuards(AccessTokenGuard)
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Create Project' })
  @ApiCreatedResponse({
    description: 'Created Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CreateProjectDto,
  })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto)
  }

  @ApiOperation({ summary: 'Get All Projects' })
  @ApiCreatedResponse({
    description: 'Created Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get()
  findAll() {
    return this.projectsService.findAll()
  }

  @ApiOperation({ summary: 'Create Sub Projects' })
  @ApiCreatedResponse({
    description: 'Update & Create Sub-Projects Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CreateBudgetDto,
  })
  @Post(':id/sub-projects')
  createSubProjects(@Param('id') id: string, @Body() createBudgetDto: CreateBudgetDto) {
    return this.projectsService.createSubProjects(id, createBudgetDto)
  }

  @ApiOperation({ summary: 'Add New Expense' })
  @ApiCreatedResponse({
    description: 'New Expense Added Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CreateBudgetDto,
  })
  @Post(':projectId/sub-projects/:subProjectId/add-expense')
  addNewExpense(
    @Param('projectId') projectId: string,
    @Param('subProjectId') subProjectId: string,
    @Body() createBudgetDto: CreateBudgetDto,
  ) {
    return this.projectsService.addNewExpense(projectId, subProjectId, createBudgetDto)
  }

  @ApiOperation({ summary: 'Add Profit' })
  @ApiCreatedResponse({
    description: 'Profit Added Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    type: CreateBudgetDto,
  })
  @Post(':projectId/sub-projects/:subProjectId/add-profit')
  addNewProfit(
    @Param('projectId') projectId: string,
    @Param('subProjectId') subProjectId: string,
    @Body() createBudgetDto: CreateBudgetDto,
  ) {
    return this.projectsService.addNewProfit(projectId, subProjectId, createBudgetDto)
  }

  @ApiOperation({ summary: 'Get Single Project' })
  @ApiCreatedResponse({
    description: 'Project Found Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id)
  }

  @ApiOperation({ summary: 'Delete Single Project' })
  @ApiCreatedResponse({
    description: 'Delete Project Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id)
  }

  @ApiOperation({ summary: 'Delete All Projects' })
  @ApiCreatedResponse({
    description: 'Delete All Project Successfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Delete()
  deleteAll() {
    return this.projectsService.deleteAll()
  }
}
