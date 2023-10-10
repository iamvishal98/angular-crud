export interface TodoList {
  id: string;
  description: string;
  createdOn: Date;
  completed: boolean;
}

export interface ResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface IFirebaseData {
  [key: string]: TodoList;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface ISignUp {
  displayName: string;
  email: string;
  password: string;
}

export interface ICurrentUser {
  displayName: string | null | undefined;
  email: string | null | undefined;
  uid: string | null | undefined;
}

export interface ITransactionData {
  date: string;
  name: string;
  allTransactions: number;
  successTransactions: number;
  acquirer: string;
}

export interface IChartData {
  [key: string] : ITransactionData[]
}


export interface ISelectOptions {
   label: string; 
   value: string;
}

export interface ISeriesData {
  name: string;
  data: number[];
}
