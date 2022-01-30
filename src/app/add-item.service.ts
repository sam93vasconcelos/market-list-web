import { Injectable } from '@angular/core';
import { Item } from './models/Item';
import { Observable } from 'rxjs';
import { HttpService } from './services/http-service';

@Injectable({
  providedIn: 'root',
})
export class AddItemService {
  constructor(private http: HttpService) {}

  handle({
    title,
    market_list_id,
    qty,
    done,
  }: {
    title: string;
    market_list_id: number;
    qty: number;
    done: boolean;
  }): Observable<any> {
    return this.http.post('api/list-items', {
      name: title,
      market_list_id,
      qty,
      done,
    });
  }
}
