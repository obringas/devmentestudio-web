import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type AppLanguage = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'devmente-lang';

  private readonly _language = signal<AppLanguage>(this.getInitialLanguage());
  readonly language = this._language.asReadonly();

  constructor() {
    effect(() => {
      const language = this._language();

      this.document.documentElement.lang = language;

      if (isPlatformBrowser(this.platformId)) {
        window.localStorage.setItem(this.storageKey, language);
      }
    });
  }

  setLanguage(language: AppLanguage): void {
    this._language.set(language);
  }

  toggleLanguage(): void {
    this._language.update((language) => (language === 'es' ? 'en' : 'es'));
  }

  private getInitialLanguage(): AppLanguage {
    if (!isPlatformBrowser(this.platformId)) {
      return 'es';
    }

    const storedLanguage = window.localStorage.getItem(this.storageKey);
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    return browserLanguage.startsWith('en') ? 'en' : 'es';
  }
}
