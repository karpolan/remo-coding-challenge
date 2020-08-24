export interface IUser {
  id: string;
  uid?: string;
  idToken?: string;
  email?: string;
  name?: string;
  avatar?: string;

  tableId?: string; // id of the table where the user is sitting
  currentUser?: boolean; // true for currently logged user
}

export interface ISeat {
  x: number;
  y: number;
  // user?: IUser;
  userId?: string; // id of the user is sitting here
}

export interface ITable {
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  seats?: ISeat[];
}
