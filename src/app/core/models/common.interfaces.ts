export interface IApiResponse<T> {
  data: T;
}

export type MessageType = "inbox" | "sent" | "trash";