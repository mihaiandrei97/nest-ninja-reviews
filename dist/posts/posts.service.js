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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(post) {
        return this.prismaService.post.create({ data: post });
    }
    findAll() {
        return this.prismaService.post.findMany();
    }
    findOne(id) {
        const post = this.prismaService.post.findUnique({
            where: {
                id: id,
            },
        });
        console.log(post, 'aici');
        if (!post)
            throw new common_1.NotFoundException('Post Not Found');
        return post;
    }
    update(id, post) {
        return this.prismaService.post.update({
            where: { id: id },
            data: post,
        });
    }
    remove(id) {
        return this.prismaService.post.delete({ where: { id: id } });
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map