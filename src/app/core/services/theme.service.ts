import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly #key = 'product-todo-theme';
  readonly #storageService = inject(LocalStorageService);
  #darkMode = signal<boolean>(
    this.#storageService.get(this.#key)?.theme ?? true
  );

  isDarkMode() {
    return this.#darkMode();
  }

  setTheme() {
    if (this.#darkMode()) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    const colorScheme = this.#darkMode() ? 'dark' : 'light';
    document.body.style.setProperty('color-scheme', colorScheme);
    document.documentElement.classList.toggle('dark', this.#darkMode());
  }

  setDarkMode(isDarkMode: boolean) {
    this.#darkMode.set(isDarkMode);
    this.setTheme();
    this.#storageService.set(this.#key, { theme: isDarkMode });
  }
}
