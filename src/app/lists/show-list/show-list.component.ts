import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit {
  items = [
    { name: 'Pão x 5', bought: false },
    { name: 'Ovo x 12', bought: false },
    { name: 'Salsichinha x 1', bought: false },
    { name: 'Refri x 2', bought: true },
    { name: 'Batata x 4', bought: false },
    { name: 'Tomate x 5', bought: false },
  ];

  itemsBought = this.items.filter((item) => item.bought);
  itemsUnbought = this.items.filter((item) => !item.bought);

  constructor() {}

  ngOnInit(): void {}

  deleteItem(item: string) {
    this.items = this.items.filter((i) => i.name !== item);
    this.updateNumbers();
  }

  updateNumbers() {
    this.itemsBought = this.items.filter((item) => item.bought);
    this.itemsUnbought = this.items.filter((item) => !item.bought);
  }
}
