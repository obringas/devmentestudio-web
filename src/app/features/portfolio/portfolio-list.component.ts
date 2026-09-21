import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';
import { getPortfolioCases } from '../../data/portfolio.data';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- HERO -->
      <section class="relative overflow-hidden py-20 lg:py-28">
        <div class="absolute inset-0 -z-10">
          <div class="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"></div>
          <div class="absolute left-1/4 bottom-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl"></div>
        </div>

        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="mb-4 inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
              {{ copy().eyebrow }}
            </span>
            <h1 class="mb-6 text-4xl font-display font-bold leading-tight text-surface-900 md:text-5xl lg:text-6xl">
              {{ copy().title }}
            </h1>
            <p class="text-lg leading-relaxed text-surface-600 md:text-xl">
              {{ copy().description }}
            </p>
          </div>
        </div>
      </section>

      <!-- CASOS DE PORTFOLIO -->
      <section class="pb-24 lg:pb-32">
        <div class="container-custom">
          <div class="space-y-16 lg:space-y-20">
            @for (item of cases(); track item.id; let i = $index) {
              <article class="overflow-hidden rounded-3xl border-2 border-surface-200/80 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <!-- IMAGEN DE PORTADA -->
                  <div class="lg:col-span-6 overflow-hidden bg-surface-100 p-4 sm:p-6 lg:p-8">
                    <div class="relative overflow-hidden rounded-2xl border border-surface-200/60 shadow-inner bg-surface-900/5 aspect-video">
                      <img
                        [src]="item.coverImage"
                        [alt]="item.title"
                        loading="lazy"
                        class="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  <!-- CONTENIDO -->
                  <div class="p-6 sm:p-8 lg:col-span-6 lg:py-8 lg:pr-10 lg:pl-0">
                    <div class="mb-4 flex flex-wrap items-center gap-2">
                      <span class="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700">
                        {{ item.industry }}
                      </span>
                      <span class="rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-surface-600">
                        {{ item.role }}
                      </span>
                    </div>

                    <h2 class="mb-4 text-2xl font-display font-bold text-surface-900 md:text-3xl">
                      {{ item.title }}
                    </h2>

                    <div class="space-y-3 text-sm leading-relaxed text-surface-600 sm:text-base mb-6">
                      <p>
                        {{ item.summary }}
                      </p>
                      <p class="border-l-2 border-primary-500 pl-4 text-surface-700 font-medium">
                        {{ item.solution }}
                      </p>
                    </div>

                    <!-- TECNOLOGÍAS -->
                    <div class="mb-8">
                      <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500">
                        {{ copy().techLabel }}
                      </p>
                      <div class="flex flex-wrap gap-2">
                        @for (tech of item.technologies; track tech) {
                          <span class="rounded-full border border-surface-200 bg-surface-50 px-3 py-1 text-xs font-medium text-surface-700">
                            {{ tech }}
                          </span>
                        }
                      </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-4">
                      <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">
                        {{ copy().ctaCase }}
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            }
          </div>

          <!-- BANNER CIERRE -->
          <div class="mt-20 rounded-3xl border-2 border-surface-200/80 bg-surface-50 p-8 sm:p-12 text-center">
            <h3 class="mb-4 text-2xl font-display font-bold text-surface-900 md:text-3xl">
              {{ copy().bottomTitle }}
            </h3>
            <p class="mx-auto mb-8 max-w-2xl text-surface-600">
              {{ copy().bottomDescription }}
            </p>
            <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">
              {{ copy().bottomCta }}
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioListComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly cases = computed(() => getPortfolioCases(this.language()));

  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'Portfolio',
          title: 'Case Studies & Production Solutions',
          description:
            'Real-world systems, mission-critical operations, and enterprise modernization architectures in active production.',
          techLabel: 'Technologies used',
          ctaCase: 'Discuss a similar project',
          bottomTitle: 'Have an active system needing evolution or modernization?',
          bottomDescription:
            'Tell us about your current stack, database or integration challenges, and we will prepare a phased technical approach.',
          bottomCta: 'Contact us for a diagnosis',
        }
      : {
          eyebrow: 'Portfolio',
          title: 'Casos reales y sistemas en producción',
          description:
            'Proyectos reales de modernización gradual, integración fiscal y arquitectura de bases de datos operando en entornos críticos.',
          techLabel: 'Tecnologías utilizadas',
          ctaCase: 'Consultar por un proyecto similar',
          bottomTitle: '¿Tenés un sistema en funcionamiento que necesita evolucionar?',
          bottomDescription:
            'Contanos sobre tu arquitectura actual, base de datos o desafío técnico, y evaluamos juntos un plan por etapas.',
          bottomCta: 'Pedir un diagnóstico técnico',
        }
  ));
}
