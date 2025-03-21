import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PendingProduct } from '../../../../core/models/pending-products.type';

@Component({
  selector: 'app-product-dialog',
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './product-dialog.component.html',
})
export class ProductDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ProductDialogComponent>);
  readonly data = inject<PendingProduct>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
