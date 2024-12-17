import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { IMessage } from "../models/message.interfaces";
import { inject, Injectable } from "@angular/core";
import { UserState } from "./user.store";
import { of, switchMap, take, tap } from "rxjs";
import { MessageService } from "../../pages/hub/messages/data-access/message.service";

export class GetMessages {
    static readonly type = '[Message] Get Messages';
}

export class ClearMassages {
  static readonly type = '[Message] Clear Data';
}

export interface MessageStateModel {
    messages: IMessage[] | undefined;
}

@State<MessageStateModel>({
  name: 'messages',
  defaults: {
    messages: [],
  },
})
@Injectable()
export class MessageState {
  private store: Store = inject(Store);
  private messageService: MessageService = inject(MessageService);

  @Action(GetMessages)
  getAllMessages(ctx: StateContext<MessageStateModel>) {
    return this.store.select(UserState.getLoggedInUser).pipe(
      take(1),
      switchMap((user) => {
        return user ? this.messageService.getMessages(user) : of([]);
      }),
      tap((messages) => {
        ctx.patchState({ messages });
      })
    );
  }

  @Action(ClearMassages)
  clearMessages(ctx: StateContext<MessageStateModel>) {
    ctx.patchState({ messages: [] });
  }

  @Selector()
  static getAllMessages(state: MessageStateModel) {
    return state.messages;
  }
}