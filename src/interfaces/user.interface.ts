interface User {
  username: string;
  email: string;
  password: string;
  roleId: string;
  accountType: string;
  profileId: string;
  lastLogin: number;
  updatedBy: string;
  updatedDate: number;
  isDeleted: boolean;
  isActive: boolean;
  isLocked: boolean;
}

export default User;
