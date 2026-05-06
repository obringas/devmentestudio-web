import {
  Component,
  signal,
  computed,
  inject,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { getHeaderContent, getMainNav } from '../../../../data';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly locale = inject(LocaleService);
  private readonly onScroll = () => this.scrolled.set(window.scrollY > 50);

  readonly language = this.locale.language;
  readonly navItems = computed(() => getMainNav(this.language()));
  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly copy = computed(() => getHeaderContent(this.language()));

  readonly headerClasses = computed(() => ({
    'bg-surface-950/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_18px_48px_rgba(2,6,23,0.28)]': this.scrolled(),
    'bg-transparent': !this.scrolled(),
  }));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollListener();
    }
  }

  setLanguage(language: 'es' | 'en'): void {
    this.locale.setLanguage(language);
  }

  private initScrollListener(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
