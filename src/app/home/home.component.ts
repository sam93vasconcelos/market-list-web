import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { List } from '../models/List';
import { GetListsService } from '../services/get-lists.service';
import { GetSharedListsService } from '../services/get-shared-lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private getListsService: GetListsService,
    private authService: AuthService,
    private getSharedListsService: GetSharedListsService
  ) {}

  username = this.authService.getUserName();

  ngOnInit(): void {
    this.getLists();
    this.getSharedLists();
  }

  lists: List[] = [];
  sharedLists: any[] = [];

  handleLogout() {
    this.authService.logout();
  }

  getLists() {
    this.getListsService.getLists().subscribe((response) => {
      this.lists = response;
    });
  }

  getSharedLists() {
    this.getSharedListsService.handle().subscribe((response) => {
      console.log(response);

      this.sharedLists = response;
    });
  }

  handleDelete(id: number) {
    this.lists = this.lists.filter((list) => list.id !== id);
  }
}
