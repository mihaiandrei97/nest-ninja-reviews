import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(post: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Post[]>;
    findOne(id: number): Promise<import(".prisma/client").Post>;
    update(id: number, post: UpdatePostDto): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post>;
}
