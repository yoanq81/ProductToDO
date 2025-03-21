import { Component, computed, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { PendingProductsService } from '../../../../core/services/pending-products.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PendingProduct } from '../../../../core/models/pending-products.type';
import { PendingProductDialogComponent } from '../pending-product-dialog/pending-product-dialog.component';

@Component({
  selector: 'app-pp-table-view',
  imports: [MatTableModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './table-view.component.html',
})
export class PendingProductTableViewComponent {
  readonly #pendingProductsService = inject(PendingProductsService);
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
    'title',
    'description',
    'category',
    'price',
    'stock',
    'brand',
    'action',
  ];
  #smallDisplayedColumns: string[] = ['title', 'category', 'price', 'action'];
  #xsmallDisplayedColumns: string[] = ['title', 'action'];
  protected readonly displayedColumns = computed(() => {
    return this.#smallSignal()
      ? this.#smallDisplayedColumns
      : this.#xsmallSignal()
      ? this.#xsmallDisplayedColumns
      : this.#fullDisplayedColumns;
  });

  products = this.#pendingProductsService.pendingProductsRes;
  dataSource = computed(() =>
    this.products.hasValue() ? this.products.value()! : []
  );

  openDialog(element: PendingProduct): void {
    const dialogRef = this.dialog.open(PendingProductDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

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
