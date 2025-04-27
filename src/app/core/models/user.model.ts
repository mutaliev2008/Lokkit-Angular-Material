export interface User {
  address: string;
  avatar: any;
  createdAt: string;
  email: string;
  followers: User[];
  following: User[];
  fullname: string;
  gender: string;
  mobile: string;
  password: string;
  role: string;
  saved: any[];
  story: string;
  updatedAt: string;
  username: string;
  website: string;
  __v: number;
  _id: string;
}

export interface GetUsersResponse {
  users: User[];
  result: number;
}
