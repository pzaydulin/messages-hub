import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RecipientInputComponent } from '../recipient-input/recipient-input.component';
import { ComposeService } from '../../data-access/compose.service';
import { IUser } from '../../../../../core/models/user.interfaces';

@Component({
  selector: 'app-compose-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    RecipientInputComponent,
  ],
  templateUrl: './compose-form.component.html',
})
export class ComposeFormComponent {
  private composeService: ComposeService = inject(ComposeService);

  currentUser = this.composeService.currentUser;
  users = this.composeService.users;

  // The form controls
  controls = {
    to: signal(''),
    sender: signal(''),
    subject: signal(''),
    body: signal(''),
  };

  // The selected recipient
  selectedRecipient = computed(() => {
    return this.users().find((user) => user.email === this.controls.to());
  })

  // The form value
  public formValue = computed(() => {
    return {
      to: this.selectedRecipient()?._id ?? '',
      sender: this.currentUser()?._id ?? '',
      subject: this.controls.subject(),
      body: this.controls.body(),
    };
  });

  // The computed value that checks if the recipient is wrong
  public wrongRecipient = computed(() => {
    return this.controls.to().length > 0 && !this.selectedRecipient();
  })

  // The computed value that checks if the form is valid
  public formValid = computed(() => {
    return (
      this.controls.to().length > 0 &&
      this.selectedRecipient() &&
      this.controls.subject().length > 0 &&
      this.controls.body().length > 0
    );
  })

  onSubmit() {
    console.log('Form submitted', this.formValue());
  }

}
