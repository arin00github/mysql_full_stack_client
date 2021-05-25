export interface IUserProfile {
  name: string;
  email: string;
  role?: string;
  active?: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IUserCollect {
  userInfo: any;
  reviews?: string[];
  bootcamps?: string[];
}
