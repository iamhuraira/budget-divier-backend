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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { UsersService } from '../user/user.service';
import { TokenDto } from './dto/token.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { SigninDto } from './dto/signin.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    private configService;
    private usersService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, configService: ConfigService, usersService: UsersService);
    signup(signUpDto: SignupDto): Promise<TokenDto>;
    updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
    signIn(data: SigninDto): Promise<TokenDto>;
    hashData(data: string): Promise<string>;
    logout(userId: string): Promise<UserDocument>;
    refreshTokens(userId: string, refreshToken: string): Promise<TokenDto>;
    getTokens(userId: string, username: string): Promise<TokenDto>;
}
