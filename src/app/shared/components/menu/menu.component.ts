import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Inbox',
        icon: 'pi pi-inbox',
        routerLink: ['/messages'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Sent',
        icon: 'pi pi-send',
        routerLink: ['/sent'],
        routerLinkActive: 'is-active',
      },
      {
        label: 'Trash',
        icon: 'pi pi-trash',
        routerLink: ['/trash'],
        routerLinkActive: 'is-active',
      },
    ];
  }
}
