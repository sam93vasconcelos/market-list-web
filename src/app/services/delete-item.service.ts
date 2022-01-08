import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root',
})
export class DeleteItemService {
  constructor() {}

  handle(item: string) {
    const currentItems: Item[] =
      JSON.parse(localStorage.getItem('items')) || [];
    const itemsUpdated = currentItems.filter(
      (currentItem) => currentItem.name !== item
    );
    localStorage.setItem('items', JSON.stringify(itemsUpdated));
  }
}
