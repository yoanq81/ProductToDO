import { Component, inject, OnInit } from '@angular/core';
import { LayoutComponent } from './features/layout/layout.component';
import { MatIconRegistry } from '@angular/material/icon';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ProductToDo';
  readonly #matIconRegistry = inject(MatIconRegistry);
  readonly #themeService = inject(ThemeService);

  ngOnInit() {
    this.#matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
    this.#themeService.setTheme();
  }
}
