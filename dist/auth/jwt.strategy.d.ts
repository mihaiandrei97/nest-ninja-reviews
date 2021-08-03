import { AuthService } from './auth.service';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private auth;
    constructor(auth: AuthService);
    validate(payload: {
        userId: number;
    }): Promise<{
        userId: number;
    }>;
}
export {};
