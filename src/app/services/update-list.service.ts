import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateListService {
  constructor(private httpService: HttpService) {}

  handle(id: number, title: string): Observable<any> {
    return this.httpService.patch(`api/market-lists/update-title/${id}`, {
      title,
    });
  }
}
