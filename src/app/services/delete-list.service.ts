import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteListService {
  constructor(private httpService: HttpServiceService) {}

  handle(id: number): Observable<any> {
    return this.httpService.delete(`api/market-lists/${id}`);
  }
}
