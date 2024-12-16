export interface IMessage {
  _id: string;
  to: string;
  sender: string;
  subject: string;
  body: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}