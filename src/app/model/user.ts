export interface User {
  _id: string;
  username: string;
  hash: string | undefined;
  isAdmin: boolean | undefined;
  name: string | undefined;
  jobTitle: string | undefined;
  bio: string | undefined;
}
