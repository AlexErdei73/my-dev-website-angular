export interface User {
  _id: string;
  username: String;
  hash: String | undefined;
  isAdmin: Boolean | undefined;
  name: String | undefined;
  jobTitle: String | undefined;
  bio: String | undefined;
}
