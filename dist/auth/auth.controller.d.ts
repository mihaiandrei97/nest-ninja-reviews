import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ email, password }: LoginDto): Promise<{
        accessToken: string;
    }>;
    register({ email, password }: LoginDto): Promise<import(".prisma/client").User>;
}
