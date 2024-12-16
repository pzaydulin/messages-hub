import { computed, Injectable, Signal, signal } from '@angular/core';
import { STORAGE_KEY } from '../constants';
import { IUser } from '../models/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // source
  storageData = signal(this.getItem())

  // select
  isAuth: Signal<boolean> = computed(() => !!this.storageData())
  currentUser: Signal<IUser | undefined> = computed(() =>  (this.isAuth()) ? this.getCurrentUser() : null);
  
  setItem(data: any) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    this.storageData.set(data);
  }
  getItem() {
    return localStorage.getItem(STORAGE_KEY);
  }
  removeItem() {
    localStorage.removeItem(STORAGE_KEY);
    this.storageData.set(null);
  }

  getToken() {
    const data = this.getItem();
    if (data) {
      return (JSON.parse(data) as IUser).token;
    }
    return null;
  }
  getCurrentUser() {
    const data = this.getItem();
    return data ? JSON.parse(data) : undefined;
  }
}
