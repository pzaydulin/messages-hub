import { Component } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

}
