import { Strategy } from 'passport-jwt';
import { Request } from 'express';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(req: Request, payload: any): {
        userId: any;
        email: any;
        refreshToken: string;
        issueAt: any;
        expireAt: any;
    };
}
export {};
