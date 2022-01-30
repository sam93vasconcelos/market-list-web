import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateShareService {
  constructor(private http: HttpService) {}

  handle(user_email: string, market_list_id: number): Observable<any> {
    return this.http.post('api/shares', {
      user_email,
      market_list_id,
    });
  }
}
