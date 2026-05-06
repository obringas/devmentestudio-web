import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFeaturedServices, getServicesPreviewContent } from '../../../../data';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section relative overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,12,23,0),rgba(14,23,43,0.72),rgba(6,12,23,0))]"></div>

      <div class="container-custom">
        <div class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="section-intro">
            <span class="eyebrow">{{ copy().eyebrow }}</span>
            <h2 class="mt-6 text-4xl font-bold text-surface-900 md:text-5xl">
              {{ copy().title }}
            </h2>
            <p class="mt-5 text-lg text-surface-600">
              {{ copy().description }}
            </p>
          </div>
          <a routerLink="/servicios" class="btn-outline w-full justify-center lg:w-auto">
            {{ copy().allServices }}
          </a>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          @for (service of services(); track service.id; let i = $index) {
            <a
              [routerLink]="['/servicios', service.slug]"
              class="card-interactive group relative overflow-hidden p-7 sm:p-8"
            >
              <div class="absolute right-0 top-0 h-36 w-36 rounded-full bg-primary-500/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"></div>
              <div class="relative flex h-full flex-col">
                <div class="flex items-start justify-between gap-6">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-surface-500">
                      0{{ i + 1 }}
                    </p>
                    <h3 class="mt-4 text-2xl font-display font-semibold text-surface-900">
                      {{ service.title }}
                    </h3>
                  </div>
                  <span class="rounded-full border border-surface-200 bg-white px-3 py-1 text-xs text-surface-500">
                    {{ service.technologies.length }} {{ copy().techLabel }}
                  </span>
                </div>

                <p class="mt-5 max-w-xl text-surface-600">
                  {{ service.shortDescription }}
                </p>

                <div class="mt-6 flex flex-wrap gap-2">
                  @for (tech of service.technologies.slice(0, 3); track tech.name) {
                    <span class="rounded-full border border-surface-200 bg-white px-3 py-2 text-xs uppercase tracking-[0.16em] text-surface-500">
                      {{ tech.name }}
                    </span>
                  }
                </div>

                <div class="mt-8 grid gap-3 sm:grid-cols-2">
                  @for (feature of service.features.slice(0, 4); track feature) {
                    <div class="rounded-2xl border border-surface-200 bg-white px-4 py-3 text-sm text-surface-600">
                      {{ feature }}
                    </div>
                  }
                </div>

                <div class="mt-8 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-primary-300">
                  <span>{{ copy().explore }}</span>
                  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </a>
          }
        </div>

        <div class="mt-8 grid gap-4 lg:grid-cols-3">
          @for (pillar of copy().pillars; track pillar.title) {
            <article class="metric-tile">
              <p class="text-xs uppercase tracking-[0.2em] text-surface-500">{{ pillar.label }}</p>
              <p class="mt-2 text-lg font-display font-semibold text-surface-900">{{ pillar.title }}</p>
              <p class="mt-2 text-sm text-surface-500">{{ pillar.description }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPreviewComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly services = computed(() => getFeaturedServices(this.language(), 4));
  readonly copy = computed(() => getServicesPreviewContent(this.language()));
}
