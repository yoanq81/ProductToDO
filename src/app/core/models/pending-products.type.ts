import { Injectable } from '@angular/core';
import { Adapter } from '../utils/adapter';

export class PendingProduct {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public category: string,
    public price: number,
    public stock: number,
    public brand: string,
    public thumbnail: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class PendingProductAdapter implements Adapter<PendingProduct> {
  adapt(item: any): PendingProduct {
    return new PendingProduct(
      item.id,
      item.title,
      item.description,
      item.category,
      item.price,
      item.stock,
      item.brand,
      item.thumbnail
    );
  }
}
