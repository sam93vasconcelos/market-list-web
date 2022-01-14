import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateListService {
  constructor(private httpService: HttpServiceService) {}

  handle(id: number, title: string): Observable<any> {
    return this.httpService.patch(`api/market-lists/update-title/${id}`, {
      title,
    });
  }
}
