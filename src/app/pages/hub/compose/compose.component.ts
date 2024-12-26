import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ComposeFormComponent } from './ui/compose-form/compose-form.component';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CardComponent, ComposeFormComponent],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.css',
})
export class ComposeComponent {

}
