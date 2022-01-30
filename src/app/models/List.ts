import { Item } from './Item';
import { User } from './User.model';

export interface List {
  id: number;
  title: string;
  list_items?: Item[];
  shares?: any[];
  user: User;
}
