export interface IUser {
  uid: string;
  email: string;
  firstName: string;
  iNumber?: number | null;
  lastName: string;
  profilePicture?: string;
  role: string;
  roles: string[];
}
