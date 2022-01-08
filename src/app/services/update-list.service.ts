import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateListService {
  constructor() {}

  handle(newTitle: string) {
    alert(newTitle);
  }
}
