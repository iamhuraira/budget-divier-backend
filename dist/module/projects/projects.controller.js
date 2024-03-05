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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const create_budget_dto_1 = require("./dto/create-budget.dto");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    create(createProjectDto) {
        return this.projectsService.create(createProjectDto);
    }
    findAll() {
        return this.projectsService.findAll();
    }
    createSubProjects(id, createBudgetDto) {
        return this.projectsService.createSubProjects(id, createBudgetDto);
    }
    addNewExpense(projectId, subProjectId, createBudgetDto) {
        return this.projectsService.addNewExpense(projectId, subProjectId, createBudgetDto);
    }
    addNewProfit(projectId, subProjectId, createBudgetDto) {
        return this.projectsService.addNewProfit(projectId, subProjectId, createBudgetDto);
    }
    findOne(id) {
        return this.projectsService.findOne(id);
    }
    remove(id) {
        return this.projectsService.remove(id);
    }
    deleteAll() {
        return this.projectsService.deleteAll();
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Project' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, swagger_1.ApiBody)({
        type: create_project_dto_1.CreateProjectDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Projects' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create Sub Projects' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Update & Create Sub-Projects Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, swagger_1.ApiBody)({
        type: create_budget_dto_1.CreateBudgetDto,
    }),
    (0, common_1.Post)(':id/sub-projects'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_budget_dto_1.CreateBudgetDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "createSubProjects", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add New Expense' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'New Expense Added Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, swagger_1.ApiBody)({
        type: create_budget_dto_1.CreateBudgetDto,
    }),
    (0, common_1.Post)(':projectId/sub-projects/:subProjectId/add-expense'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('subProjectId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_budget_dto_1.CreateBudgetDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addNewExpense", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add Profit' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Profit Added Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, swagger_1.ApiBody)({
        type: create_budget_dto_1.CreateBudgetDto,
    }),
    (0, common_1.Post)(':projectId/sub-projects/:subProjectId/add-profit'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('subProjectId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_budget_dto_1.CreateBudgetDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addNewProfit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get Single Project' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Project Found Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete Single Project' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Delete Project Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete All Projects' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Delete All Project Successfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "deleteAll", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map