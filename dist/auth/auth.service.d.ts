import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    register(email: string, password: string): Promise<import(".prisma/client").User>;
    validateUser(userId: number): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User>;
}
