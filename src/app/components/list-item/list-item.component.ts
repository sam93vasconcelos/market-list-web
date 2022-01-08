import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { HandleItemDoneService } from '../../services/handle-item-done.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() item: Item;
  @Output() deleteItemEvent = new EventEmitter<string>();
  @Output() changeItemEvent = new EventEmitter<boolean>();

  confirmDelete = false;

  constructor(private handleItemDoneService: HandleItemDoneService) {}

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
    this.handleItemDoneService.handle(this.item.name, state);
    this.item.done = state;
    this.changeItemEvent.emit(state);
  }
}
