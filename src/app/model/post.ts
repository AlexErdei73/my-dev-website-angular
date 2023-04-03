import { Block } from './block';
import { User } from './user';
import { Comment } from './comment';

export interface Post {
  _id: string;
  title: string;
  author: User | string;
  content: Block[];
  comments: Comment[] | string[];
  likes: string[];
  published: boolean;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}
