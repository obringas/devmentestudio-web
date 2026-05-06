import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { getCtaSectionContent } from '../../../../data';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section relative overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.14),transparent_24%)]"></div>

      <div class="container-custom">
        <div class="surface-panel relative overflow-hidden p-7 sm:p-10 lg:p-12">
          <div class="absolute right-[-7rem] top-[-7rem] h-56 w-56 rounded-full bg-primary-500/15 blur-3xl"></div>
          <div class="absolute bottom-[-8rem] left-[-5rem] h-56 w-56 rounded-full bg-accent-500/15 blur-3xl"></div>

          <div class="relative grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
            <div>
              <span class="eyebrow">{{ copy().eyebrow }}</span>
              <h2 class="mt-6 text-4xl font-bold text-surface-100 md:text-5xl">
                {{ copy().title }}
              </h2>
              <p class="mt-5 max-w-2xl text-lg text-surface-300">
                {{ copy().description }}
              </p>

              <div class="mt-8 flex flex-col gap-4 sm:flex-row">
                <a routerLink="/contacto" class="btn-primary px-8 py-4 text-base sm:text-lg">
                  {{ copy().primaryCta }}
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
                <a href="https://wa.me/5493874513777" target="_blank" rel="noopener noreferrer" class="btn-secondary px-8 py-4 text-base sm:text-lg">
                  {{ copy().secondaryCta }}
                </a>
              </div>
            </div>

            <div class="grid gap-4">
              @for (card of copy().cards; track card.title) {
                <article class="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                  <p class="text-xs uppercase tracking-[0.2em] text-surface-500">{{ card.label }}</p>
                  <p class="mt-2 font-display text-xl font-semibold text-surface-100">{{ card.title }}</p>
                  <p class="mt-2 text-sm text-surface-400">{{ card.description }}</p>
                </article>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSectionComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => getCtaSectionContent(this.language()));
}
