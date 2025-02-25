import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ComposeFormComponent } from './ui/compose-form/compose-form.component';
import { RecipientInputComponent } from './ui/recipient-input/recipient-input.component';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CardComponent, ComposeFormComponent, RecipientInputComponent],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.css',
})
export class ComposeComponent {}
