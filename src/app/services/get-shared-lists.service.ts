import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { Observable } from 'rxjs';
import { List } from '../models/List';

@Injectable({
  providedIn: 'root',
})
export class GetSharedListsService {
  constructor(private http: HttpService) {}

  handle(): Observable<List[]> {
    return this.http.get<List[]>('api/shares');
  }
}
