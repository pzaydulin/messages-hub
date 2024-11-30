import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
