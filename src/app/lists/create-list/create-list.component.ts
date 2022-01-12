import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateListService } from '../../services/create-list.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private createListService: CreateListService
  ) {}

  ngOnInit(): void {}

  createListForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });

  saveList() {
    this.createListService.handle(this.createListForm.get('title').value);
  }
}
