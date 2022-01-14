import { Item } from './Item';

export interface List {
  id: number;
  title: string;
  list_items?: Item[];
}
