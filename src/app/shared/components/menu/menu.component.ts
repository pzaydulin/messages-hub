import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuModule, BadgeModule],
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
        routerLink: ['messages', 'inbox'],
        routerLinkActiveOptions: { exact: true },
        badge: '2'
      },
      {
        label: 'Sent',
        icon: 'pi pi-send',
        routerLink: ['messages', 'sent'],
        routerLinkActive: 'is-active',
      },
      {
        label: 'Trash',
        icon: 'pi pi-trash',
        routerLink: ['messages', 'trash'],
        routerLinkActive: 'is-active',
      },
    ];
  }
}
