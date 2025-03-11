import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { IMessage } from "../models/message.interfaces";
import { inject, Injectable } from "@angular/core";
import { UserState } from "./user.store";
import { tap } from "rxjs";
import { MessageService } from "../../pages/hub/messages/data-access/message.service";

export class GetMessages {
    static readonly type = '[Message] Get Messages';
}

export class ClearMassages {
  static readonly type = '[Message] Clear Data';
}

export interface MessageStateModel {
  messages: IMessage[];
  unread: string;
}

@State<MessageStateModel>({
  name: 'messages',
  defaults: {
    messages: [],
    unread: '',
  },
})
@Injectable()
export class MessageState {
  private store: Store = inject(Store);
  private messageService: MessageService = inject(MessageService);

  @Action(GetMessages)
  getAllMessages(ctx: StateContext<MessageStateModel>) {
    const loggedInUser = this.store.selectSnapshot(UserState.getLoggedInUser);
    let unread = 0;
    return this.messageService.getMessages(loggedInUser).pipe(
      tap((messages) => {
        ctx.patchState({ unread: '' });
        // check if there are unread messages
        unread = messages.reduce((acc, message) => {
          if (
            loggedInUser &&
            message.status === 1 &&
            message.sender._id !== loggedInUser._id
          ) {
            return acc + 1;
          }
          return acc;
        }, 0);
        if (unread > 0) {
          ctx.patchState({ unread: unread.toString() });
        }
        ctx.patchState({ messages });
      })
    );
  }

  @Action(ClearMassages)
  clearMessages(ctx: StateContext<MessageStateModel>) {
    ctx.patchState({ messages: [], unread: '' });
  }

  @Selector()
  static getCountUnreadMessages(state: MessageStateModel) {
    return state.unread;
  }

  @Selector()
  static getAllMessages(state: MessageStateModel) {
    return state.messages;
  }
}