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

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss'],
})
export class ShowListComponent implements OnInit {
  items: Item[] = JSON.parse(localStorage.getItem('items')) || [];

  itemsDone = this.items.filter((item) => item.done);
  itemsUndone = this.items.filter((item) => !item.done);

  constructor(
    private formBuilder: FormBuilder,
    private addItemService: AddItemService,
    private updateListService: UpdateListService,
    private deleteItemService: DeleteItemService
  ) {}

  itemsForm = this.formBuilder.group({
    name: [''],
  });

  titleForm = this.formBuilder.group({ title: 'Título da lista' });

  ngOnInit(): void {}

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
    this.updateListService.handle(this.titleForm.get('title').value);
  }
}
