interface AuthUser {
  uid: string;
  email?: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  iNumber: number;
  role: string;
  roles: [string];
}

export default AuthUser