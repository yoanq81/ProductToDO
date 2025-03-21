import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { ProductList, State } from '../models/products.type';

@Injectable({
  providedIn: 'root',
})
export class DbService extends Dexie {
  productList!: Table<ProductList, number>;

  constructor() {
    super('productToDoDB');

    this.version(3).stores({
      productList: 'id,state',
    });
  }

  async addNewProduct(newProduct: ProductList) {
    await this.productList.add(newProduct);
  }

  async deleteProduct(productId: number) {
    await this.productList.delete(productId);
  }

  async listProductItem(state: State | undefined) {
    if (state) {
      return await this.productList
        .where({
          state: state,
        })
        .toArray();
    } else {
      return await this.productList.toArray();
    }
  }
}
