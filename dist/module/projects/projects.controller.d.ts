/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateBudgetDto } from './dto/create-budget.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("./schemas/project.schema").ProjectDocument>;
    findAll(): Promise<import("./schemas/project.schema").ProjectDocument[]>;
    createSubProjects(id: string, createBudgetDto: CreateBudgetDto): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/project.schema").ProjectDocument> & import("./schemas/project.schema").Project & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    addNewExpense(projectId: string, subProjectId: string, createBudgetDto: CreateBudgetDto): Promise<{
        status: number;
        message: string;
    }>;
    addNewProfit(projectId: string, subProjectId: string, createBudgetDto: CreateBudgetDto): Promise<{
        status: number;
        message: string;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/project.schema").ProjectDocument> & import("./schemas/project.schema").Project & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<{
        status: number;
        message: string;
    }>;
    deleteAll(): Promise<{
        status: number;
        message: string;
    }>;
}
