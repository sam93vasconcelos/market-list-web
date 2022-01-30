import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateListService {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  /**
   *
   * @param title
   * Create a new market list
   */
  handle(title: string): Observable<any> {
    return this.httpService.post('api/market-lists', {
      title,
    });
  }
}
