import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  createListForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });

  saveList() {
    console.log(this.createListForm.value);
  }
}
