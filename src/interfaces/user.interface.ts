interface User {
  username: string;
  email: string;
  password: string;
  roleId: string;
  accountType: string;
  profileId: string;
  lastLogin: number;
  updatedBy?: string;
  updatedDate?: number;
  status: UserStatus;
}

export interface UpdateUser {
  roleId?: string;
  accountType?: string;
  profileId?: string;
  lastLogin?: number;
  updatedBy?: string;
  updatedDate?: number;
  status?: UserStatus;
}

export default User;
