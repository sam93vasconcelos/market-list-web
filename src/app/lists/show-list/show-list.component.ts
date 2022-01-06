import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit {
  typesOfShoes: string[] = [
    'Pão x 5',
    'Ovo x 12',
    'Salsichinha x 1',
    'Refri x 2',
    'Batata x 4',
    'Tomate x 5',
  ];

  constructor() {}

  ngOnInit(): void {}
}
