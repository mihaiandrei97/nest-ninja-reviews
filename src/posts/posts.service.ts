import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  create(post: CreatePostDto) {
    return this.prismaService.post.create({ data: post });
  }

  findAll() {
    return this.prismaService.post.findMany();
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) throw new NotFoundException('Post Not Found');
    return post;
  }

  update(id: number, post: UpdatePostDto) {
    return this.prismaService.post.update({
      where: { id: id },
      data: post,
    });
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id: id } });
  }
}
