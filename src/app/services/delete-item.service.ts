import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteItemService {
  constructor(private http: HttpService) {}

  handle(item: number): Observable<any> {
    return this.http.delete(`api/list-items/${item}`);
  }
}
