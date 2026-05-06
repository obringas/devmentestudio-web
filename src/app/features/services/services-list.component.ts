import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { getServices } from '../../data';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <section class="relative overflow-hidden py-24 lg:py-32">
        <div class="absolute inset-0 -z-10">
          <div class="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"></div>
        </div>

        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="mb-4 block font-medium text-primary-400">{{ copy().eyebrow }}</span>
            <h1 class="mb-6 text-4xl font-display font-bold text-surface-900 md:text-5xl lg:text-6xl">
              {{ copy().title }}
            </h1>
            <p class="text-lg text-surface-500">
              {{ copy().description }}
            </p>
          </div>
        </div>
      </section>

      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="grid gap-8">
            @for (service of services(); track service.id) {
              <a
                [routerLink]="['/servicios', service.slug]"
                class="group grid gap-8 rounded-[2rem] border border-surface-200 bg-surface-50 p-6 transition-all duration-500 hover:border-primary-500/50 lg:grid-cols-[1.2fr_0.8fr] lg:p-8"
              >
                <div class="flex flex-col justify-center">
                  <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                    @switch (service.icon) {
                      @case ('rocket') {
                        <svg class="h-7 w-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                        </svg>
                      }
                      @case ('shopping-cart') {
                        <svg class="h-7 w-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                      }
                      @case ('code') {
                        <svg class="h-7 w-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                      }
                      @default {
                        <svg class="h-7 w-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      }
                    }
                  </div>

                  <h2 class="mb-4 text-2xl font-display font-bold text-surface-900 transition-colors group-hover:text-primary-400 md:text-3xl">
                    {{ service.title }}
                  </h2>

                  <p class="mb-6 text-surface-500">
                    {{ service.fullDescription }}
                  </p>

                  <div class="mb-6 flex flex-wrap gap-2">
                    @for (tech of service.technologies; track tech.name) {
                      <span class="rounded-full bg-surface-50 px-3 py-1 text-xs text-surface-600">
                        {{ tech.name }}
                      </span>
                    }
                  </div>

                  <div class="flex items-center font-medium text-primary-400">
                    <span>{{ copy().viewDetails }}</span>
                    <svg class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>

                <div class="rounded-[1.5rem] bg-surface-50 p-5 sm:p-6">
                  <h3 class="mb-4 text-lg font-semibold text-surface-200">{{ copy().includes }}</h3>
                  <ul class="space-y-3">
                    @for (feature of service.features; track feature) {
                      <li class="flex items-start gap-3">
                        <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span class="text-surface-600">{{ feature }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <section class="bg-surface-50 py-16 lg:py-24">
        <div class="container-custom text-center">
          <h2 class="mb-4 text-2xl font-display font-bold text-surface-900 md:text-3xl">
            {{ copy().ctaTitle }}
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-surface-500">
            {{ copy().ctaDescription }}
          </p>
          <a routerLink="/contacto" class="btn-primary">
            {{ copy().ctaButton }}
          </a>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly services = computed(() => getServices(this.language()));
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'Our Services',
          title: 'Digital solutions for every business stage',
          description:
            'From high-converting landing pages to custom business systems, we build digital products designed to move your business forward.',
          viewDetails: 'View details',
          includes: 'Includes:',
          ctaTitle: 'Need something different?',
          ctaDescription: 'Tell us about your project and we will shape the right solution for your business.',
          ctaButton: 'Contact us',
        }
      : {
          eyebrow: 'Nuestros Servicios',
          title: 'Soluciones digitales para cada necesidad',
          description:
            'Desde landing pages de alto impacto hasta sistemas empresariales complejos, ofrecemos soluciones integrales para impulsar tu negocio.',
          viewDetails: 'Ver detalles',
          includes: 'Incluye:',
          ctaTitle: 'No encontrás lo que buscás?',
          ctaDescription: 'Contanos tu proyecto y encontramos la solución perfecta para vos.',
          ctaButton: 'Contactanos',
        }
  ));
}
