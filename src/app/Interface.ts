export interface TodoList {
    id: string;
    description:string;
    createdOn: Date;
    completed: boolean
}

export interface ResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

export interface IAuth {
    email: string;
    password: string;
}

export interface ISignUp {
    displayName: string,
    email: string;
    password: string;
}

export interface ICurrentUser {
    displayName:string | null | undefined;
    email:string | null | undefined;
    uid:string | null | undefined;
}