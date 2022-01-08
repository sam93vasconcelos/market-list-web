import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddItemService {
  constructor() {}

  handle(item: string) {
    const currentItems = JSON.parse(localStorage.getItem('items')) || [];
    if (currentItems.some((currentItem) => currentItem.name === item)) {
      return;
    }

    const updatedItems = [...currentItems, { name: item, bought: false }];
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }
}
