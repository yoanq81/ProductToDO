import { Component, computed, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../../../../core/services/products.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PendingProduct } from '../../../../core/models/pending-products.type';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-table-view',
  imports: [MatTableModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
})
export class ProductTableViewComponent {
  readonly #productsService = inject(ProductsService);
  readonly #breakpointObserver = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);

  #smallSignal = toSignal(
    this.#breakpointObserver.observe(Breakpoints.Small).pipe(
      map((result) => result.matches),
      shareReplay()
    )
  );
  #xsmallSignal = toSignal(
    this.#breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map((result) => result.matches),
      shareReplay()
    )
  );
  #fullDisplayedColumns: string[] = [
    'state',
    'title',
    'description',
    'category',
    'price',
    'stock',
    'brand',
    'action',
  ];
  #smallDisplayedColumns: string[] = ['state', 'title', 'category', 'price', 'action'];
  #xsmallDisplayedColumns: string[] = ['state','title', 'action'];
  protected readonly displayedColumns = computed(() => {
    return this.#smallSignal()
      ? this.#smallDisplayedColumns
      : this.#xsmallSignal()
      ? this.#xsmallDisplayedColumns
      : this.#fullDisplayedColumns;
  });

  products = this.#productsService.productsRes;
  dataSource = computed(() =>
    this.products.hasValue() ? this.products.value()! : []
  );

  openDialog(element: PendingProduct): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async deleteProduct(productId: number, productName: string) {
    if (confirm('Está seguro que desea eliminar el producto ' + productName + '?')) {
      await this.#productsService.deleteProduct(productId);
      this.#productsService.refreshProducts();
    }
  }
}
