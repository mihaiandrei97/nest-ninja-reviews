import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  content?: string;
  published: boolean;
  authorId?: number;
}
