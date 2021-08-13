export interface IUser {
  uid: string;
  email: string;
  firstName: string;
  iNumber?: number | null;
  lastName: string;
  role: string;
  roles: [string];
}