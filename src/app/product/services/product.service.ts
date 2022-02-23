import { Injectable } from '@angular/core';
import { db } from '../services/db';
import { liveQuery } from 'dexie';

@Injectable()
export class ProductService {
  constructor() { }

  getProducts() {
    return liveQuery(() => db.productItems.toArray());
  }

  getProduct(id: number) {
    return db.productItems.get({ id });
  }

  addProduct(formData: any) {
    return db.productItems.add(formData);
  }

  updateProduct(id: number, formData: any) {
    return db.productItems.where('id').equals(id).modify(formData);
  }

  deleteProduct(id: number) {
    return db.productItems.where('id').equals(id).delete();
  }
   
}