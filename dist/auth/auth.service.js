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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        const user = await this.prismaService.user.findUnique({
            where: { email: email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Invalid email or password');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return {
            accessToken: this.jwtService.sign({
                userId: user.id,
            }),
        };
    }
    async register(email, password) {
        const user = await this.prismaService.user.findUnique({
            where: { email: email },
        });
        if (user) {
            throw new common_1.HttpException('Email already in use', common_1.HttpStatus.CONFLICT);
        }
        const hash = await bcrypt.hash(password, 10);
        const createdUser = await this.prismaService.user.create({
            data: { email, password: hash },
        });
        return createdUser;
    }
    validateUser(userId) {
        return this.prismaService.user.findUnique({ where: { id: userId } });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map