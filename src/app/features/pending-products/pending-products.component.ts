import { Component, inject, model, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { PendingProductsService } from '../../core/services/pending-products.service';
import { ViewSelected } from '../../core/models/view-selected.type';
import { PendingProductTableViewComponent } from './components/table-view/table-view.component';
import { PendingProductCardViewComponent } from './components/card-view/card-view.component';

@Component({
  selector: 'app-pending-products',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    PendingProductTableViewComponent,
    PendingProductCardViewComponent,
  ],
  templateUrl: './pending-products.component.html',
})
export default class PendingProductsComponent {
  readonly #pendingProductsService = inject(PendingProductsService);
  numberOfElements = signal(this.#pendingProductsService.elementToReturn);
  viewSelected = signal<ViewSelected>(
    this.#pendingProductsService.viewSelected
  );

  selectValueChange(value: number) {
    this.numberOfElements.set(value);
    this.#pendingProductsService.setNumberOfElements(value);
  }

  changeViewSelected(value: ViewSelected) {
    this.viewSelected.set(value);
    this.#pendingProductsService.setViewSelected(value);
  }

  reloadPendingProducts() {
    this.#pendingProductsService.refreshPendingProducts();
  }
}
