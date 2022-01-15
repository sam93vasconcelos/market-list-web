import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateListService } from '../../services/create-list.service';
import { catchError, throwError } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private createListService: CreateListService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  createListForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });

  saveList() {
    this.createListService
      .handle(this.createListForm.get('title').value)
      .pipe(
        catchError((err) => {
          return throwError(() => console.log(err));
        })
      )
      .subscribe(() => {
        this.createListForm.reset();
        this.createListForm.get('title')?.setErrors(null);

        this.toast.success('Salvo!');
      });
  }
}
