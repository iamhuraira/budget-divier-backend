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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const refreshToken_guard_1 = require("../common/guards/refreshToken.guard");
const accessToken_guard_1 = require("../common/guards/accessToken.guard");
const signin_dto_1 = require("./dto/signin.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(createAuthDto) {
        console.log('createAuthDto', createAuthDto);
        return this.authService.signup(createAuthDto);
    }
    signin(data) {
        return this.authService.signIn(data);
    }
    refreshTokens(req) {
        const { userId, refreshToken } = req.user;
        return this.authService.refreshTokens(userId, refreshToken);
    }
    logout(req) {
        this.authService.logout(req.user.userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Create User' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Created Succesfully',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, swagger_1.ApiBody)({
        type: signup_dto_1.SignupDto,
        description: 'User SignUp',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'SignIn' }),
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SigninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Refresh Access Token' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, common_1.UseGuards)(refreshToken_guard_1.RefreshTokenGuard),
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Logout' }),
    (0, swagger_1.ApiSecurity)('JWT-auth'),
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map