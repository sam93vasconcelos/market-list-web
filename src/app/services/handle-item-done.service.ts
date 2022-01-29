import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class HandleItemDoneService {
  constructor(private http: HttpServiceService) {}

  handle(item: number | string, state: boolean) {
    if (state) {
      this.http
        .patch(`api/list-items/${item}/set-as-done`, [])
        .subscribe((res) => {
          console.log(res);
        });
      return;
    }

    this.http
      .patch(`api/list-items/${item}/set-as-undone`, [])
      .subscribe((res) => {
        console.log(res);
      });
  }
}
