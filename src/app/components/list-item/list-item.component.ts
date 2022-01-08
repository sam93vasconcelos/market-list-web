import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item;
  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() changeItemEvent = new EventEmitter<boolean>();

  confirmDelete = false;

  constructor() {}

  ngOnInit(): void {}

  handleDelete(event, item) {
    event.stopPropagation();

    if (this.confirmDelete) {
      this.deleteItemEvent.emit(item);
      return;
    }

    this.confirmDelete = true;

    setTimeout(() => {
      this.confirmDelete = false;
    }, 2000);
  }

  handleChange(state: boolean) {
    this.item.bought = state;
    this.changeItemEvent.emit(state);
  }
}
