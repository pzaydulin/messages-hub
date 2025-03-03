import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ComposeFormComponent } from './ui/compose-form/compose-form.component';
import { RecipientInputComponent } from './ui/recipient-input/recipient-input.component';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CardComponent, ComposeFormComponent, RecipientInputComponent],
  template: `
  <app-card>
    <div card-header>Compose Message</div>
    <div card-body>
        <app-compose-form />
    </div>
  </app-card>
  `,
})
export class ComposeComponent {}
