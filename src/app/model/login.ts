import { User } from './user';

export interface Login {
  success: boolean;
  token: string;
  msg: string;
  password: string;
  user: User;
}
