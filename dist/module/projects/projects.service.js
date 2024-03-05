"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("./schemas/project.schema");
const budget_schema_1 = require("./schemas/budget.schema");
let ProjectsService = class ProjectsService {
    constructor(ProjectModel) {
        this.ProjectModel = ProjectModel;
    }
    async create(createProjectDto) {
        return new this.ProjectModel(createProjectDto).save();
    }
    async findAll() {
        return this.ProjectModel.find().exec();
    }
    async createSubProjects(id, createBudgetDto) {
        const project = await this.ProjectModel.findById(id).exec();
        const obj = createBudgetDto.userContributions;
        Object.keys(obj).forEach((key) => {
            obj[key] /= 2;
        });
        const budgetItem = new budget_schema_1.BudgetItem({
            budget_name: createBudgetDto.budget_name,
            amount: createBudgetDto.amount / 2,
            generate_by: createBudgetDto.generate_by,
            userContributions: obj,
        });
        const subProject = {
            _id: new mongoose_2.Types.ObjectId(),
            subProject_name: project?.name,
            budget: [{ _id: new mongoose_2.Types.ObjectId(), ...budgetItem }],
        };
        const subProject1 = { ...subProject, subProject_name: `${project.name} - 1` };
        const subProject2 = { ...subProject, subProject_name: `${project.name} - 2` };
        const result = await this.ProjectModel.findByIdAndUpdate(id, { $push: { subProjects: { $each: [subProject1, subProject2] } } }, { new: true }).exec();
        return {
            status: 200,
            message: 'Sub-Projects Created Successfully',
            data: result,
        };
    }
    async addNewExpense(projectId, subProjectId, createBudgetDto) {
        const project = await this.ProjectModel.findById(projectId).exec();
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        const budgetItem = {
            budget_name: createBudgetDto.budget_name,
            amount: createBudgetDto.amount,
            generate_by: createBudgetDto.generate_by,
            userContributions: createBudgetDto.userContributions,
        };
        const subProjectIndex = project.subProjects.findIndex((subProject) => subProject._id.toString() === subProjectId);
        if (subProjectIndex === -1) {
            throw new common_1.HttpException('Invalid subProjectId', common_1.HttpStatus.BAD_REQUEST);
        }
        const update = { $push: { [`subProjects.${subProjectIndex}.budget`]: budgetItem } };
        const result = await this.ProjectModel.updateOne({ _id: projectId }, update);
        if (result.modifiedCount === 0) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: 200,
            message: 'New Expense Added Successfully',
        };
    }
    async addNewProfit(projectId, subProjectId, createBudgetDto) {
        const project = await this.ProjectModel.findById(projectId).exec();
        if (!project) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        const budgetItem = {
            budget_name: createBudgetDto.budget_name,
            amount: createBudgetDto.amount,
            generate_by: createBudgetDto.generate_by,
            userContributions: createBudgetDto.userContributions,
        };
        const subProjectIndex = project.subProjects.findIndex((subProject) => subProject._id.toString() === subProjectId);
        if (subProjectIndex === -1) {
            throw new common_1.HttpException('Invalid subProjectId', common_1.HttpStatus.BAD_REQUEST);
        }
        const update = { $push: { [`subProjects.${subProjectIndex}.budget`]: budgetItem } };
        const result = await this.ProjectModel.updateOne({ _id: projectId }, update);
        if (result.modifiedCount === 0) {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: 200,
            message: 'New Expense Added Successfully',
        };
    }
    async findOne(id) {
        return this.ProjectModel.findById(id).exec();
    }
    async deleteAll() {
        await this.ProjectModel.deleteMany({}).exec();
        return {
            status: 200,
            message: 'All Projects Deleted Successfully',
        };
    }
    async remove(id) {
        await this.ProjectModel.findByIdAndDelete(id).exec();
        return {
            status: 200,
            message: 'Project Deleted Successfully',
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map