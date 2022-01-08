import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root',
})
export class HandleItemDoneService {
  constructor() {}

  handle(item: string, state: boolean) {
    const currentItems: Item[] =
      JSON.parse(localStorage.getItem('items')) || [];

    const currentItem = currentItems.find((thisItem) => thisItem.name === item);

    if (currentItem) {
      currentItem.done = state;
    }

    localStorage.setItem('items', JSON.stringify(currentItems));
  }
}
