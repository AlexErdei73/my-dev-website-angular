export interface User {
  _id: string;
  username: string;
  password: string | undefined;
  hash: string | undefined;
  isAdmin: boolean | undefined;
  name: string | undefined;
  jobTitle: string | undefined;
  bio: string | undefined;
}
