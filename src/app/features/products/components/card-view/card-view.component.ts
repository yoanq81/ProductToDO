import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-product-card-view',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './card-view.component.html',
})
export class ProductCardViewComponent {
  readonly #productsService = inject(ProductsService);
  products = this.#productsService.productsRes;
  dataSource = computed(() =>
    this.products.hasValue() ? this.products.value()! : []
  );

  async deleteProduct(productId: number, productName: string) {
    if (
      confirm('Está seguro que desea eliminar el producto ' + productName + '?')
    ) {
      await this.#productsService.deleteProduct(productId);
      this.#productsService.refreshProducts();
    }
  }
}
