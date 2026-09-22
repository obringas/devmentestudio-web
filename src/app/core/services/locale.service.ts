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
    this.persistLanguageInUrl(language);
  }

  toggleLanguage(): void {
    this._language.update((language) => (language === 'es' ? 'en' : 'es'));
  }

  private getInitialLanguage(): AppLanguage {
    const urlLanguage = this.getUrlLanguage();
    if (urlLanguage) {
      return urlLanguage;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return 'es';
    }

    const storedLanguage = window.localStorage.getItem(this.storageKey);
    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage;
    }

    const browserLanguage = window.navigator.language.toLowerCase();
    return browserLanguage.startsWith('es') ? 'es' : 'en';
  }

  private getUrlLanguage(): AppLanguage | null {
    try {
      const url = new URL(this.document.location.href);
      const language = url.searchParams.get('lang');
      return language === 'es' || language === 'en' ? language : null;
    } catch {
      return null;
    }
  }

  private persistLanguageInUrl(language: AppLanguage): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }
}
