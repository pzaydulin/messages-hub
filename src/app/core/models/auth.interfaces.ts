import { IUser } from "./user.interfaces";

export interface ILogin {
    email: string;
    password: string;
}

export interface AuthData { 
    message: string;
    data: IUser;
}