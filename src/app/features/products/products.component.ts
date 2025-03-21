import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ProductCardViewComponent } from './components/card-view/card-view.component';
import { ProductTableViewComponent } from './components/table-view/table-view.component';
import { ProductsService } from '../../core/services/products.service';
import { ViewSelected } from '../../core/models/view-selected.type';
import { State } from '../../core/models/products.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductListViewComponent } from "./components/list-view/list-view.component";

@Component({
  selector: 'app-products',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIcon,
    MatTooltipModule,
    ProductCardViewComponent,
    ProductTableViewComponent,
    ProductListViewComponent
],
  templateUrl: './products.component.html',
})
export default class ProductsComponent {
  readonly #productsService = inject(ProductsService);
  stateFilter = signal(this.#productsService.stateFilter);
  viewSelected = signal<ViewSelected>(this.#productsService.viewSelected);

  selectValueChange(value: State | undefined) {
    this.stateFilter.set(value);
    this.#productsService.setStateFilter(value);
  }

  changeViewSelected(value: ViewSelected) {
    this.viewSelected.set(value);
    this.#productsService.setViewSelected(value);
  }

  reloadPendingProducts() {
    this.#productsService.refreshProducts();
  }
}
