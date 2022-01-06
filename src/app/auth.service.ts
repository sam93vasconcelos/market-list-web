import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  redirectUrl = this.route.snapshot.queryParams['return'] || '';

  login(password: string): void {
    localStorage.setItem('token', password);
    this.router.navigate([this.redirectUrl]);
  }
}
