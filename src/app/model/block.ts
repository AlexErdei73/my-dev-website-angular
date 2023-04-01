import { Link } from './link';

export interface Block {
  _id: string;
  post: string;
  type: string;
  language: string | undefined;
  text: string;
  links: Link[];
}
