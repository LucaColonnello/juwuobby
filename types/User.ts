export type UserUID = string;

export interface User {
  uid: UserUID;
  name?: string;
  email?: string;
}
