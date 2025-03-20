import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PendingProductsService } from '../../core/services/pending-products.service';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {
  readonly #router = inject(Router);

  readonly #pendingProductsService = inject(PendingProductsService);
  readonly #productsService = inject(ProductsService);
  pendingProducts = this.#pendingProductsService.pendingProductsRes;
  products = this.#productsService.productsRes;
  dataSourcePendingProducts = computed(() => this.pendingProducts.hasValue() ? this.pendingProducts.value()!.slice(0, 7) : []);
  dataSourceProducts = computed(() => this.products.hasValue() ? this.products.value()!.slice(0, 7) : []);
  hasPendingProducts = computed(() => this.pendingProducts.hasValue() && this.pendingProducts.value()!.length > 0);
  hasProducts = computed(() => this.products.hasValue() && this.products.value()!.length > 0);

  goToRoute(route: string) {
    this.#router.navigate([route]);
  }
}
