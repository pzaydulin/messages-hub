import { IUser } from './user.interfaces';

export interface IMessage {
  _id?: string;
  to: Partial<IUser>;
  sender: Partial<IUser>;
  subject: string;
  body: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}
