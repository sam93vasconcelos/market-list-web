import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';
import { List } from '../models/List';

@Injectable({
  providedIn: 'root',
})
export class GetListService {
  constructor(private httpService: HttpServiceService) {}

  handle(id: number): Observable<List> {
    return this.httpService.get<List>(`api/market-lists/${id}`);
  }
}
