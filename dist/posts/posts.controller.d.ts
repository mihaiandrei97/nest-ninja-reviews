import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").Post[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post>;
    update(id: string, updatePostDto: UpdatePostDto): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__PostClient<import(".prisma/client").Post>;
}
