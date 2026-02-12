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
import { MAIN_NAV } from '../../../../data';

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
  private readonly onScroll = () => this.scrolled.set(window.scrollY > 50);

  readonly navItems = MAIN_NAV;
  readonly mobileMenuOpen = signal(false);
  readonly scrolled = signal(false);

  readonly headerClasses = computed(() => ({
    'bg-surface-950/80 backdrop-blur-xl border-b border-surface-800/50': this.scrolled(),
    'bg-transparent': !this.scrolled(),
  }));

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollListener();
    }
  }

  private initScrollListener(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(open => !open);
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
