import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoveShareService {
  constructor(private http: HttpServiceService) {}

  handle(id: number): Observable<any> {
    return this.http.delete(`api/shares/${id}`);
  }
}
