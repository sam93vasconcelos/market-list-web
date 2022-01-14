import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateListService {
  constructor(
    private httpService: HttpServiceService,
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
