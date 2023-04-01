import { Link } from './link';

export interface Comment {
  _id: string;
  author: string;
  post: string;
  text: string | undefined;
  links: Link[];
}
