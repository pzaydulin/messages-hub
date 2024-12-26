import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IMessage } from '../../../../../core/models/message.interfaces';
import { InitialsPipe } from '../../../../../shared/pipes/initials.pipe';
import { DateAgoPipe } from '../../../../../shared/pipes/date-ago.pipe';
import { TruncatePipe } from '../../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [ButtonModule, InitialsPipe, DateAgoPipe, TruncatePipe],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css',
})
export class MessageItemComponent {
  message = input.required<IMessage>();
}
