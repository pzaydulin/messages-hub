import { Component, input } from '@angular/core';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { IMessage } from '../../../../../core/models/message.interfaces';

@Component({
  selector: 'app-message-read',
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card>
      <div card-header></div>
      <div card-body></div>
      <div card-footer><button>back</button><button>delete</button></div>
    </app-card>
  `,
  styles: ``,
})
export class MessageReadComponent {
  message = input.required<IMessage>();
}
