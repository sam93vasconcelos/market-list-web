import { Component, OnInit } from '@angular/core';
import { List } from '../models/List';
import { GetListsService } from '../services/get-lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private getListsService: GetListsService) {}

  ngOnInit(): void {
    this.getLists();
  }

  lists: List[] = [];

  getLists() {
    this.getListsService.getLists().subscribe((response) => {
      this.lists = response;
    });
  }

  handleDelete(id: number) {
    this.lists = this.lists.filter((list) => list.id !== id);
  }
}
