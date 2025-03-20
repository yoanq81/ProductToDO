import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PendingProductsService } from '../../../../core/services/pending-products.service';

@Component({
  selector: 'app-pp-card-view',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class PendingProductCardViewComponent {
  readonly #pendingProductsService = inject(PendingProductsService);
  products = this.#pendingProductsService.pendingProductsRes;
  dataSource = computed(() =>
    this.products.hasValue() ? this.products.value()! : []
  );

  approveProduct(productId: number, productName: string) {
    if (confirm('Está seguro de aprobar el producto ' + productName + '?')) {
      this.#pendingProductsService.approveProduct(productId);
    }
  }

  rejectProduct(productId: number, productName: string) {
    if (confirm('Está seguro de rechazar el producto ' + productName + '?')) {
      this.#pendingProductsService.rejectProduct(productId);
    }
  }
}
