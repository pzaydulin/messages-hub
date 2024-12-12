export interface IUser {
    _id: string;
    email: string;
    name: string;
    token: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface AuthData { 
    message: string;
    data: IUser;
}