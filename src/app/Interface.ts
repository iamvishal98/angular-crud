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


export interface IDataTable {
  
    id: string;
    name: string;
    dob: string;
    street: string;
    town: string;
    postode: string;
    telephone: string;
    pets: Array<string>;
    score: number;
    email: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
    image7: string;
    image8: string;
    image9: string;
    image10: string;
  
}