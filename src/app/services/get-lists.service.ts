import { Injectable } from '@angular/core';
import { List } from '../models/List';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetListsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  headerOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    }),
  };

  private _list: List[];

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(
      'http://192.168.7.114:8000/api/market-lists',
      this.headerOptions
    );
  }

  get(): List[] {
    this.getLists();
    return this._list;
  }
}
