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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/schemas/user.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService, configService, usersService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
        this.usersService = usersService;
    }
    async signup(signUpDto) {
        const userExists = await this.usersService.findByUserEmail(signUpDto.email);
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hash = await this.hashData(signUpDto.password);
        const newUser = await this.usersService.create({
            ...signUpDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser._id, newUser.email);
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
        return tokens;
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
    }
    async signIn(data) {
        const user = await this.usersService.findByUserEmail(data.email);
        if (!user)
            throw new common_1.BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user._id, user.email);
        await this.updateRefreshToken(user._id, tokens.refreshToken);
        return tokens;
    }
    hashData(data) {
        return argon2.hash(data);
    }
    async logout(userId) {
        return this.usersService.update(userId, { refreshToken: null });
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken) {
            throw new common_1.ForbiddenException('Access Denied');
        }
        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
    async getTokens(userId, username) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: '30m',
            }),
            this.jwtService.signAsync({
                sub: userId,
                username,
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService,
        user_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map