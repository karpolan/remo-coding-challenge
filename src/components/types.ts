export interface IUser {
  id: string;
  uid?: string;
  idToken?: string;
  email?: string;
  name?: string;
  avatar?: string;
}

export interface ISeat {
  x: number;
  y: number;
  user?: IUser;
}

export interface ITable {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  seats?: ISeat[];
}
