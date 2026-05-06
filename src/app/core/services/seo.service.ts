import { DOCUMENT } from '@angular/common';
import { effect, Injectable, inject } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import { siteConfig } from '../../config/site.config';
import { AppLanguage, LocaleService } from './locale.service';

const PAGE_TITLES: Record<string, Record<AppLanguage, string>> = {
  home: {
    es: 'DevMenteStudio - Desarrollo de Software Profesional',
    en: 'DevMenteStudio - Professional Software Development',
  },
  services: {
    es: 'Servicios | DevMenteStudio',
    en: 'Services | DevMenteStudio',
  },
  'service-detail': {
    es: 'Detalle de Servicio | DevMenteStudio',
    en: 'Service Detail | DevMenteStudio',
  },
  portfolio: {
    es: 'Portfolio | DevMenteStudio',
    en: 'Portfolio | DevMenteStudio',
  },
  'project-detail': {
    es: 'Proyecto | DevMenteStudio',
    en: 'Project | DevMenteStudio',
  },
  about: {
    es: 'Nosotros | DevMenteStudio',
    en: 'About | DevMenteStudio',
  },
  contact: {
    es: 'Contacto | DevMenteStudio',
    en: 'Contact | DevMenteStudio',
  },
  blog: {
    es: 'Blog | DevMenteStudio',
    en: 'Blog | DevMenteStudio',
  },
  terms: {
    es: 'Terminos y Condiciones | DevMenteStudio',
    en: 'Terms and Conditions | DevMenteStudio',
  },
  privacy: {
    es: 'Politica de Privacidad | DevMenteStudio',
    en: 'Privacy Policy | DevMenteStudio',
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly locale = inject(LocaleService);

  private initialized = false;

  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.applyRouteSeo());

    this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event) => event.snapshot.firstChild === null),
      )
      .subscribe(() => this.applyRouteSeo());

    effect(() => {
      this.locale.language();
      if (this.initialized) {
        this.applyRouteSeo();
      }
    });

    this.applyRouteSeo();
  }

  private applyRouteSeo(): void {
    const route = this.getLeafRoute();
    const language = this.locale.language();
    const description = this.getDescription(route?.data?.['description'], language);
    const pageTitle = this.getTitle(route?.data?.['pageKey'] as string | undefined, language);
    const path = this.router.url.split('?')[0] || '/';
    const canonicalUrl = this.toAbsoluteUrl(path);

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:image', content: siteConfig.ogImage });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:image', content: siteConfig.ogImage });

    this.setCanonical(canonicalUrl);
  }

  private getDescription(
    descriptionData: string | Record<AppLanguage, string> | undefined,
    language: AppLanguage,
  ): string {
    if (typeof descriptionData === 'string') {
      return descriptionData;
    }

    if (descriptionData?.[language]) {
      return descriptionData[language];
    }

    return language === 'en'
      ? 'Professional software development for modern digital products.'
      : siteConfig.description;
  }

  private getTitle(pageKey: string | undefined, language: AppLanguage): string {
    if (pageKey && PAGE_TITLES[pageKey]) {
      return PAGE_TITLES[pageKey][language];
    }

    return language === 'en'
      ? 'DevMenteStudio - Professional Software Development'
      : siteConfig.seo.defaultTitle;
  }

  private getLeafRoute() {
    let route = this.router.routerState.root.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }
    return route?.snapshot;
  }

  private toAbsoluteUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${siteConfig.url}${normalizedPath === '/' ? '' : normalizedPath}`;
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
