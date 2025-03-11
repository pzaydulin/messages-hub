import { Component, DestroyRef, inject } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngxs/store';
import { MessageState } from '../../../core/store-ngxs/message.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  private store: Store = inject(Store);
  private unread$: Observable<string> = this.store.select(MessageState.getCountUnreadMessages);

  items: MenuItem[] = [];

  /**
   * Rebuild menu items
   * need to change badge value dinamically
   */

  buildMenu(): MenuItem[] {
    return [
      {
        label: 'Inbox',
        icon: 'pi pi-inbox',
        routerLink: ['messages', 'inbox'],
        routerLinkActiveOptions: { exact: true },
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

  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.unread$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (unread:string) => {
        this.items = this.buildMenu();
        this.items[0].badge = unread;
      },
    });
  }

}
