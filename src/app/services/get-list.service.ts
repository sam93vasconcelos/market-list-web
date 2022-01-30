import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { List } from '../models/List';

@Injectable({
  providedIn: 'root',
})
export class GetListService {
  constructor(private httpService: HttpService) {}

  handle(id: number): Observable<List> {
    return this.httpService.get<List>(`api/market-lists/${id}`);
  }
}
