import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public settoken(token: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, token);
  }

  public gettoken(): string|null {
    const token = window.sessionStorage.getItem(USER_KEY);

    return token ?? null;
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(USER_KEY);

    return !!token;
  }
}
