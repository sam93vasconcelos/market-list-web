import { Injectable } from '@angular/core';
import { Item } from './models/Item';
import { Observable } from 'rxjs';
import { HttpServiceService } from './services/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class AddItemService {
  constructor(private http: HttpServiceService) {}

  handle({
    title,
    market_list_id,
    qty,
  }: {
    title: string;
    market_list_id: number;
    qty: number;
  }): Observable<any> {
    return this.http.post('api/list-items', {
      name: title,
      market_list_id,
      qty,
    });
  }
}
