import { Component, OnInit } from '@angular/core';
import { List } from '../models/List';
import { GetListsService } from '../services/get-lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private getListsService: GetListsService) {}

  lists: List[] = this.getListsService.get();
}
