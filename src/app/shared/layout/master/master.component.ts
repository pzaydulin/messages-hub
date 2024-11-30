import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent {}
