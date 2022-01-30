import { Component, Inject, OnInit } from '@angular/core';
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
import { RemoveShareService } from '../../services/remove-share.service';
import { ShowListModalComponent } from '../show-list-modal/show-list-modal.component';
import { User } from '../../models/User.model';
import { AuthService } from 'src/app/auth.service';

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
    public dialog: MatDialog,
    private removeShareService: RemoveShareService,
    private authService: AuthService
  ) {}

  itemsForm = this.formBuilder.group({
    name: [''],
    qty: [1],
  });

  listOwner: User;
  loggedUser: number = this.authService.getUserId();

  listTitle: string = '';

  titleForm = this.formBuilder.group({ title: 'Carregando...' });

  listId: number = parseInt(this.route.snapshot.paramMap.get('id'));

  listShares: any;

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.getListService
      .handle(this.listId)
      .pipe(
        catchError((err) => {
          alert(err.message);
          return throwError(() => console.log(err));
        })
      )
      .subscribe((res) => {
        console.log(res);

        this.items = res.list_items;
        this.listShares = res.shares;
        this.listOwner = res.user;

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

  handleRemoveShare(id: number) {
    this.removeShareService.handle(id).subscribe((res) => {
      this.listShares = this.listShares.filter(
        (listShare) => listShare.id !== id
      );
    });
  }

  handleShareSaved(share) {
    console.log(share);

    this.listShares = [...this.listShares, share];
  }
}
