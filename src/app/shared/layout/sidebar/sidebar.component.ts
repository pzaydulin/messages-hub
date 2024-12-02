import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { MenuComponent } from "../../components/menu/menu.component";
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CardComponent, MenuComponent, ButtonModule, RippleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
