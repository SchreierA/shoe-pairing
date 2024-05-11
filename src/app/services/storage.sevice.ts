import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }
}
