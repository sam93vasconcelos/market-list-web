import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CreateListService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  headerOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    }),
  };

  /**
   *
   * @param title
   * Create a new market list
   */
  handle(title: string) {
    this.http
      .post(
        'http://localhost:8000/api/market-lists',
        { title },
        this.headerOptions
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
