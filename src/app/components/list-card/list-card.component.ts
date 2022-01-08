import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleDelete(event: MouseEvent) {
    event.stopPropagation();
    alert('Delete');
  }
}
