import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { DeleteListService } from '../../services/delete-list.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
})
export class ListCardComponent implements OnInit {
  @Input() listId: number;
  @Input() listTitle: string;
  @Input() listItems: Item[];
  @Output() deleteListEvent = new EventEmitter<number>();

  totalItems: number;
  doneItems: number;
  undonelItems: number;

  confirmDelete = false;

  ft3Items: Item[];

  constructor(private deleteListService: DeleteListService) {}

  ngOnInit(): void {
    this.totalItems = this.listItems?.length;
    this.doneItems = this.listItems?.filter((item) => item.done).length;
    this.undonelItems = this.listItems?.filter((item) => !item.done).length;
    this.ft3Items = this.listItems.slice(0, 3);
  }

  handleDelete(event: MouseEvent) {
    event.stopPropagation();

    if (this.confirmDelete) {
      this.deleteListService
        .handle(this.listId)
        .pipe(
          catchError((err) => {
            alert('Erro');
            return throwError(() => console.log(err));
          })
        )
        .subscribe(() => {
          this.deleteListEvent.emit(this.listId);
        });
    }

    this.confirmDelete = true;

    setTimeout(() => {
      this.confirmDelete = false;
    }, 2000);
  }
}
