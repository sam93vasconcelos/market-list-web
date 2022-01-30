import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RemoveShareService {
  constructor(private http: HttpService) {}

  handle(id: number): Observable<any> {
    return this.http.delete(`api/shares/${id}`);
  }
}
