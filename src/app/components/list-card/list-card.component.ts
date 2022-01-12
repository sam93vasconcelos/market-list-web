import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item';
import { DeleteListService } from '../../services/delete-list.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() listTitle: string;
  @Input() listItems: Item[];

  totalItems: number;
  doneItems: number;
  undonelItems: number;

  constructor(private deleteListService: DeleteListService) {}

  ngOnInit(): void {
    this.totalItems = this.listItems?.length;
    this.doneItems = this.listItems?.filter((item) => item.done).length;
    this.undonelItems = this.listItems?.filter((item) => !item.done).length;
  }

  handleDelete(event: MouseEvent) {
    event.stopPropagation();
    this.deleteListService.handle(/** listId */);
  }
}
