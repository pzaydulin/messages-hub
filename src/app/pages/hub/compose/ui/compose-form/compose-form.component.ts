import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-compose-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './compose-form.component.html',
})
export class ComposeFormComponent {
  controls = {
    recipient: signal(''),
    subject: signal(''),
    message: signal(''),
  };
}
