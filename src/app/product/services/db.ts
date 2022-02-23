import Dexie, { Table } from 'dexie';

export interface ProductItem {
  id?: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  productListId: number;
}


export class AppDB extends Dexie {
  productItems!: Table<ProductItem, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      productItems: '++id',
    });
  }
}

export const db = new AppDB();