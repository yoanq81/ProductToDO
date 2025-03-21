import { inject, Injectable, resource, signal } from '@angular/core';
import { ViewSelected } from '../models/view-selected.type';
import { LocalStorageService } from './storage.service';
import { DbService } from './db.service';
import { State } from '../models/products.type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #key = 'product-todo-products';
  readonly #storageService = inject(LocalStorageService);
  readonly #db = inject(DbService);

  #stateFilter = signal<State | undefined>(
    this.#storageService.get(this.#key)?.state
  );
  #viewSelected = signal<ViewSelected>(
    this.#storageService.get(this.#key)?.view ?? 'table'
  );

  productsRes = resource({
    request: () => ({ state: this.#stateFilter() }),
    loader: ({ request }) => this.#db.listProductItem(request.state),
  });

  get stateFilter() {
    return this.#stateFilter();
  }

  get viewSelected() {
    return this.#viewSelected();
  }

  setStateFilter(value: State | undefined) {
    if (value !== this.#stateFilter()) {
      const valueInStorage = this.#storageService.get(this.#key) ?? {
        state: undefined,
        view: 'table',
      };
      this.#stateFilter.set(value);
      this.#storageService.set(this.#key, {
        state: value,
        view: valueInStorage.view,
      });
    }
  }

  setViewSelected(value: ViewSelected) {
    if (value !== this.#viewSelected()) {
      const valueInStorage = this.#storageService.get(this.#key) ?? {
        state: undefined,
        view: 'table',
      };
      this.#viewSelected.set(value);
      this.#storageService.set(this.#key, {
        state: valueInStorage.state,
        view: value,
      });
    }
  }

  refreshProducts() {
    this.productsRes.reload();
  }

  async deleteProduct(productId: number) {
    await this.#db.deleteProduct(productId);
  }
}
