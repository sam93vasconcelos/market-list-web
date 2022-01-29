import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/User.model';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  private _setToken(access_token: string) {
    localStorage.setItem('@market:token', access_token);
  }

  private _setUser(user: User) {
    const userString = JSON.stringify(user);
    localStorage.setItem('@market:user', userString);
  }

  private _getToken(): string {
    return localStorage.getItem('@market:token');
  }
  private _getUser(): User {
    const userString = localStorage.getItem('@market:user');
    return JSON.parse(userString);
  }

  redirectUrl = this.route.snapshot.queryParams['return'] || '';

  /**
   *
   * @param data - email: string, password: string
   */
  login(data: LoginData): void {
    const { email, password } = data;

    this.http
      .post<LoginResponse>('http://localhost:8000/api/auth/login', data)
      .subscribe((response) => {
        this._setToken(response.access_token);
        this._setUser(response.user);

        this.router.navigate([this.redirectUrl]);
      });
  }

  /**
   *
   * @param access_token string
   * @param user User
   */
  signup(access_token: string, user: User): void {
    this._setToken(access_token);
    this._setUser(user);

    this.router.navigate([this.redirectUrl]);
  }

  /**
   *
   * returns the access_token of authenticated user
   */
  getToken(): string {
    return this._getToken();
  }

  /**
   *
   * returns the name authenticated user
   */
  getUserName(): string {
    return this._getUser().name;
  }
}
