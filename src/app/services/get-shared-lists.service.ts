import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';
import { List } from '../models/List';

@Injectable({
  providedIn: 'root',
})
export class GetSharedListsService {
  constructor(private http: HttpServiceService) {}

  handle(): Observable<List[]> {
    return this.http.get<List[]>('api/shares');
  }
}
