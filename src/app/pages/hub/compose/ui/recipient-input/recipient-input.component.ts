import { Component, computed, forwardRef, input, output, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { IUser } from '../../../../../core/models/user.interfaces';
import { InitialsPipe } from '../../../../../shared/pipes/initials.pipe';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-recipient-input',
  standalone: true,
  imports: [InitialsPipe, InputTextModule],
  templateUrl: './recipient-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecipientInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RecipientInputComponent),
      multi: true,
    },
  ],
})
export class RecipientInputComponent
  implements ControlValueAccessor, Validator
{
  users = input<IUser[]>([]);
  // recipient = output<IUser>();

  protected value = signal('');
  protected filteredUsers = signal<IUser[]>([]);

  private onChange: any = () => {};
  private onTouched: any = () => {};
  private onValidatorChange: any = () => {};

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value.trim());
    if (this.value().length > 0) {
      this.filteredUsers.set(
        this.users().filter(
          (user) =>
            user.name.toLowerCase().includes(this.value().toLowerCase()) ||
            user.email.toLowerCase().includes(this.value().toLowerCase())
        )
      );
    } else {
      this.filteredUsers.set([]);
    }
    this.onChange(input.value);
    this.onValidatorChange();
  }

  selectedUser(user: IUser) {
    this.writeValue(user.email);
    this.filteredUsers.set([]);
    // this.recipient.emit(user);
  }

  writeValue(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Not implemented
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return Validators.email(control);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }
}
