import { Strategy } from 'passport-jwt';
type JwtPayload = {
    sub: string;
    username: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor();
    validate(payload: JwtPayload): {
        userId: string;
        email: string;
    };
}
export {};