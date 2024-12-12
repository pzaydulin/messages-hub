import { computed, Injectable, signal } from '@angular/core';
import { AuthData, IUser } from '../models/auth.interfaces';
import { STORAGE_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // source
  storageData = signal(this.getItem())

  // select
  isAuth = computed(() => !!this.storageData())
  
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
}
