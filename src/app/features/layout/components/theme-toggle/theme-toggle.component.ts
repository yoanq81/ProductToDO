import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {
  readonly #themeService = inject(ThemeService);
  isDarkMode = signal(this.#themeService.isDarkMode());

  toggleTheme() {
    this.isDarkMode.update((value) => !value);
    this.#themeService.setDarkMode(this.isDarkMode());
  }
}
