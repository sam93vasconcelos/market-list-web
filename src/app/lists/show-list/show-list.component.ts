import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddItemService } from 'src/app/add-item.service';
import { UpdateListService } from '../../services/update-list.service';
import { DeleteItemService } from '../../services/delete-item.service';
import { Item } from 'src/app/models/Item';
import { GetListService } from '../../services/get-list.service';
import { GetListsService } from 'src/app/services/get-lists.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit {
  items: Item[] = [];

  itemsDone = this.items.filter((item) => item.done);
  itemsUndone = this.items.filter((item) => !item.done);

  constructor(
    private formBuilder: FormBuilder,
    private addItemService: AddItemService,
    private updateListService: UpdateListService,
    private deleteItemService: DeleteItemService,
    private getListService: GetListService,
    private route: ActivatedRoute
  ) {}

  itemsForm = this.formBuilder.group({
    name: [''],
  });
  listTitle: string = '';

  titleForm = this.formBuilder.group({ title: 'Carregando...' });

  listId: number = parseInt(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.getListService
      .handle(this.listId)
      .pipe(
        catchError((err) => {
          return throwError(() => console.log(err));
        })
      )
      .subscribe((res) => {
        this.items = res.list_items;
        this.updateNumbers();

        this.listTitle = res.title;
        this.titleForm.get('title').setValue(res.title);
      });
  }

  deleteItem(item: string) {
    this.deleteItemService.handle(item);
    this.items = this.items.filter((i) => i.name !== item);
    this.updateNumbers();
  }

  updateNumbers() {
    this.itemsDone = this.items.filter((item) => item.done);
    this.itemsUndone = this.items.filter((item) => !item.done);
  }

  handleSubmit() {
    const newItem = this.addItemService.handle(
      this.itemsForm.get('name').value
    );

    if (newItem) {
      this.items = [...this.items, newItem];
    }

    this.itemsForm.reset();
  }

  handleUpdateTitle() {
    if (this.titleForm.get('title').value === this.listTitle) {
      return;
    }

    this.updateListService
      .handle(this.listId, this.titleForm.get('title').value)
      .subscribe((res) => {
        this.listTitle = this.titleForm.get('title').value;
        console.log(res);
      });
  }
}
