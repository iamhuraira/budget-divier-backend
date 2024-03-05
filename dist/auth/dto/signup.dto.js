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
exports.SignupDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Abu Huraira', description: 'The name of the user.', required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'iamhuraira@gmail.com', description: 'The email of the user.' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Please enter correct email' }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4123004@Abh', description: 'The password of the user.' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' }),
    (0, class_validator_1.Matches)(/^(?=.*\d)/, { message: 'Password must contain at least one number' }),
    (0, class_validator_1.Matches)(/^(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character' }),
    (0, class_validator_1.Matches)(/^.{8,}$/, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
//# sourceMappingURL=signup.dto.js.map