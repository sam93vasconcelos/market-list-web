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
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

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
    private route: ActivatedRoute,
    private toast: ToastrService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(ShowListModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  itemsForm = this.formBuilder.group({
    name: [''],
    qty: [1],
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

  deleteItem(item: Item) {
    this.deleteItemService.handle(item.id).subscribe(() => {
      this.toast.success('Removido!');
    });
    this.items = this.items.filter((i) => i.name !== item.name);
    this.updateNumbers();
  }

  updateNumbers() {
    this.itemsDone = this.items.filter((item) => item.done == true);
    this.itemsUndone = this.items.filter((item) => item.done == false);
  }

  handleSubmit() {
    this.addItemService
      .handle({
        title: this.itemsForm.get('name').value,
        market_list_id: this.listId,
        qty: this.itemsForm.get('qty').value,
        done: false,
      })
      .subscribe((newItem) => {
        this.items = [...this.items, newItem];
        this.toast.success('Salvo!!');
        this.updateNumbers();
      });

    this.itemsForm.get('name').reset();
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

@Component({
  selector: 'show-list-modal.component',
  templateUrl: 'show-list-modal.component.html',
})
export class ShowListModalComponent {
  constructor(private formBuilder: FormBuilder) {}

  shareForm = this.formBuilder.group({
    email: [''],
  });

  ngOnInit(): void {}
}
