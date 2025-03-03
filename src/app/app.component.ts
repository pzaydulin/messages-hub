import { Component, DestroyRef, inject, Inject, OnInit, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { SocketService } from './core/data-access/socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { GetMessages } from './core/store-ngxs/message.store';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    ButtonModule,
    MultiSelectModule,
  ],
  // templateUrl: './app.component.html',
  template: '<router-outlet />',
  styleUrl: './app.component.css',
})

// RIPPLE при очистке не забудь об этом!!!
// https://sakai.primeng.org/documentation
// optional configuration with the default configuration

export class AppComponent implements OnInit {

  private socketService: SocketService = inject(SocketService);
  private store: Store = inject(Store);

  primeTheme = 'lara-light-blue';
  darkMode = signal<{ dark: boolean; prime: string }>({
    dark: true,
    prime: this.primeTheme,
  });
  theme = signal<string>(this.primeTheme);

  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  selectedCities: City[] = [
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private primengConfig: PrimeNGConfig
  ) {}

  
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.socketService
      .getMessage()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message) => {
        console.log('message recieved');
        
        this.store.dispatch(new GetMessages());
      });
  }

  setTheme() {
    if (this.darkMode().dark === true) {
      this.darkMode.set({
        dark: false,
        prime: 'lara-dark-blue',
      });
    } else {
      this.darkMode.set({
        dark: true,
        prime: 'lara-light-blue',
      });
    }
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = this.darkMode().prime + '.css';
    }
    document.body.classList.toggle('dark');
  }
}
