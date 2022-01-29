import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this._headerOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`,
      }),
    };
  }

  private _baseURL = 'http://localhost:8000/';

  private _headerOptions;

  get<T>(url: string): Observable<any> {
    return this.httpClient.get(this._baseURL + url, this._headerOptions);
  }

  post<T>(url: string, data: any): Observable<any> {
    return this.httpClient.post(this._baseURL + url, data, this._headerOptions);
  }

  put<T>(url: string, data: any): Observable<any> {
    return this.httpClient.put(this._baseURL + url, data, this._headerOptions);
  }

  delete<T>(url: string): Observable<any> {
    return this.httpClient.delete(this._baseURL + url, this._headerOptions);
  }

  patch<T>(url: string, data: any): Observable<any> {
    return this.httpClient.patch(
      this._baseURL + url,
      data,
      this._headerOptions
    );
  }
}
