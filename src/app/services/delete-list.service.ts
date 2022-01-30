import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root',
})
export class DeleteListService {
  constructor(private httpService: HttpService) {}

  handle(id: number): Observable<any> {
    return this.httpService.delete(`api/market-lists/${id}`);
  }
}
