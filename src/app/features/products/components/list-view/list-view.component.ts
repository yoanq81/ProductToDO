import { Component, effect, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../../../../core/services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductList } from '../../../../core/models/products.type';

@Component({
  selector: 'app-product-list-view',
  imports: [ScrollingModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './list-view.component.html',
})
export class ProductListViewComponent {
  readonly #productsService = inject(ProductsService);
  readonly dialog = inject(MatDialog);

  products = this.#productsService.productsRes;
  dataSourceProduct = new MatTableDataSource<ProductList>();

  constructor() {
    effect(() => {
      this.dataSourceProduct.data = this.products.value() ?? [];
    });
  }

  openDialog(element: ProductList): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async deleteProduct(productId: number, productName: string) {
    if (
      confirm('Está seguro que desea eliminar el producto ' + productName + '?')
    ) {
      await this.#productsService.deleteProduct(productId);
      this.#productsService.refreshProducts();
    }
  }
}
