import { Injectable } from '@angular/core';
import { List } from '../models/List';

@Injectable({
  providedIn: 'root',
})
export class GetListsService {
  constructor() {}

  private _list: List[];

  private _getLists() {
    this._list = [
      { title: 'test', items: [{ name: 'Pão', done: false, qty: 5 }] },
    ];
  }

  get(): List[] {
    this._getLists();
    return this._list;
  }
}
