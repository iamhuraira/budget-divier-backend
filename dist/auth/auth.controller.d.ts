import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { TokenDto, TokenDTOWithoutID } from './dto/token.dto';
import { SigninDto } from './dto/signin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createAuthDto: SignupDto): Promise<TokenDto>;
    signin(data: SigninDto): Promise<TokenDto>;
    refreshTokens(req: Request): Promise<TokenDTOWithoutID>;
    logout(req: Request): void;
}
