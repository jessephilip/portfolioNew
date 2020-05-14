import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public isLoggedIn = false;

  public redirectUrl: string;

  public login(password: Observable<boolean>) {
    return this.http
      .post<boolean>('api/login', { password })
      .pipe(tap((x) => (this.isLoggedIn = x)));
  }
}
