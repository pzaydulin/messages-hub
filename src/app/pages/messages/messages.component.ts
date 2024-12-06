import { Component } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { MessageItemComponent } from "../../shared/components/message-item/message-item.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent, MessageItemComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

}
