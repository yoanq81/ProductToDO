import { inject, Injectable, signal } from '@angular/core';
import { ViewSelected } from '../models/view-selected.type';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  PendingProduct,
  PendingProductAdapter,
} from '../models/pending-products.type';
import { LocalStorageService } from './storage.service';
import { DbService } from './db.service';
import { State } from '../models/products.type';

@Injectable({
  providedIn: 'root',
})
export class PendingProductsService {
  #baseUrl = 'https://dummyjson.com/products?limit=';
  readonly #key = 'product-todo-pending-products';
  readonly #storageService = inject(LocalStorageService);
  readonly #db = inject(DbService);
  readonly #httpClient = inject(HttpClient);
  readonly #adapter = inject(PendingProductAdapter);

  #numberOfElements = signal(
    this.#storageService.get(this.#key)?.elements ?? 10
  );
  #viewSelected = signal<ViewSelected>(
    this.#storageService.get(this.#key)?.view ?? 'table'
  );

  pendingProductsRes = rxResource({
    request: () => ({ limit: this.#numberOfElements() }),
    loader: ({ request }) =>
      this.#httpClient.get(`${this.#baseUrl}${request.limit}`).pipe(
        // Adapt each item in the raw data array'
        map((result: any) => result['products']),
        map((data: any[]): PendingProduct[] =>
          data.map((item) => this.#adapter.adapt(item))
        )
      ),
  });

  get elementToReturn() {
    return this.#numberOfElements();
  }

  get viewSelected() {
    return this.#viewSelected();
  }

  setNumberOfElements(value: number) {
    if (value !== this.#numberOfElements()) {
      const valueInStorage = this.#storageService.get(this.#key) ?? {
        elements: 10,
        view: 'table',
      };
      this.#numberOfElements.set(value);
      this.#storageService.set(this.#key, {
        elements: value,
        view: valueInStorage.view,
      });
    }
  }

  setViewSelected(value: ViewSelected) {
    if (value !== this.#viewSelected()) {
      const valueInStorage = this.#storageService.get(this.#key) ?? {
        elements: 10,
        view: 'table',
      };
      this.#viewSelected.set(value);
      this.#storageService.set(this.#key, {
        elements: valueInStorage.elements,
        view: value,
      });
    }
  }

  refreshPendingProducts() {
    this.pendingProductsRes.reload();
  }

  #removeFromPendingProducts(productId: number) {
    this.pendingProductsRes.update((items) => {
      return items?.filter((obj) => obj.id !== productId);
    });
  }

  #addProduct(productId: number, state: State) {
    const products = this.pendingProductsRes.value();
    const product = products?.filter((item) => item.id === productId);
    if (product) {
      this.#db.addNewProduct({
        id: productId,
        title: product[0].title,
        description: product[0].description,
        category: product[0].category,
        price: product[0].price,
        stock: product[0].stock,
        brand: product[0].brand,
        thumbnail: product[0].thumbnail,
        state: state,
      });
    }
  }

  approveProduct(productId: number) {
    this.#addProduct(productId, 'approved');
    this.#removeFromPendingProducts(productId);
  }

  rejectProduct(productId: number) {
    this.#addProduct(productId, 'rejected');
    this.#removeFromPendingProducts(productId);
  }
}
