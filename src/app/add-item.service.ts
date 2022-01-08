import { Injectable } from '@angular/core';
import { Item } from './models/Item';

@Injectable({
  providedIn: 'root',
})
export class AddItemService {
  constructor() {}

  handle(item: string): Item | null {
    const currentItems = JSON.parse(localStorage.getItem('items')) || [];
    if (currentItems.some((currentItem) => currentItem.name === item)) {
      return null;
    }

    const newItem: Item = { name: item, done: false, qty: 1 };
    const updatedItems = [...currentItems, newItem];
    localStorage.setItem('items', JSON.stringify(updatedItems));

    return newItem;
  }
}
