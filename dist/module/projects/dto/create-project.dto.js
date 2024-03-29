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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Field Year 2024-2025', description: 'Project Name Example' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '6123004a5b3b1b0c5c1d8e4f', description: 'Admin Id Example' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Admin Id is required' }),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "admin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '[6123004a5b3b1b0c5c1d8e4f, 6123004a5b3b1b0c5c1d8e4f, 6123004a5b3b1b0c5c1d8e4f]',
        description: 'Members Id Example in Array',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "members", void 0);
//# sourceMappingURL=create-project.dto.js.map