import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { getServiceBySlug } from '../../data';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (service(); as srv) {
      <div class="min-h-screen">
        <section class="relative overflow-hidden py-24 lg:py-32">
          <div class="absolute inset-0 -z-10">
            <div class="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl"></div>
          </div>

          <div class="container-custom">
            <a routerLink="/servicios" class="mb-8 inline-flex items-center gap-2 text-surface-400 transition-colors hover:text-primary-400">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              {{ copy().back }}
            </a>

            <div class="max-w-3xl">
              <h1 class="mb-6 text-4xl font-display font-bold text-surface-100 md:text-5xl lg:text-6xl">
                {{ srv.title }}
              </h1>
              <p class="text-xl text-surface-400">
                {{ srv.fullDescription }}
              </p>
            </div>
          </div>
        </section>

        <section class="bg-surface-900/30 py-16 lg:py-24">
          <div class="container-custom">
            <h2 class="mb-12 text-2xl font-display font-bold text-surface-100 md:text-3xl">
              {{ copy().includes }}
            </h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              @for (feature of srv.features; track feature) {
                <div class="rounded-xl border border-surface-800 bg-surface-900/50 p-6">
                  <svg class="mb-4 h-8 w-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <p class="text-surface-200">{{ feature }}</p>
                </div>
              }
            </div>
          </div>
        </section>

        <section class="py-16 lg:py-24">
          <div class="container-custom">
            <h2 class="mb-12 text-2xl font-display font-bold text-surface-100 md:text-3xl">
              {{ copy().benefits }}
            </h2>
            <div class="grid gap-8 md:grid-cols-3">
              @for (benefit of srv.benefits; track benefit.title) {
                <div class="text-center">
                  <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                    <svg class="h-8 w-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 class="mb-2 text-xl font-display font-semibold text-surface-100">
                    {{ benefit.title }}
                  </h3>
                  <p class="text-surface-400">
                    {{ benefit.description }}
                  </p>
                </div>
              }
            </div>
          </div>
        </section>

        <section class="bg-surface-900/30 py-16 lg:py-24">
          <div class="container-custom">
            <h2 class="mb-12 text-2xl font-display font-bold text-surface-100 md:text-3xl">
              {{ copy().technologies }}
            </h2>
            <div class="flex flex-wrap gap-4">
              @for (tech of srv.technologies; track tech.name) {
                <div class="rounded-xl border border-surface-700 bg-surface-800 px-6 py-3">
                  <span class="font-medium text-surface-200">{{ tech.name }}</span>
                </div>
              }
            </div>
          </div>
        </section>

        <section class="py-16 lg:py-24">
          <div class="container-custom text-center">
            <h2 class="mb-4 text-2xl font-display font-bold text-surface-100 md:text-3xl">
              {{ copy().ctaTitle }}
            </h2>
            <p class="mx-auto mb-8 max-w-2xl text-surface-400">
              {{ srv.cta.text }}
            </p>
            <a [routerLink]="srv.cta.href" class="btn-primary px-8 py-4 text-lg">
              {{ copy().ctaButton }}
            </a>
          </div>
        </section>
      </div>
    } @else {
      <div class="flex min-h-screen items-center justify-center px-6">
        <div class="text-center">
          <h1 class="mb-4 text-2xl font-display font-bold text-surface-100">{{ copy().notFoundTitle }}</h1>
          <a routerLink="/servicios" class="btn-primary">{{ copy().notFoundButton }}</a>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') || '')),
    { initialValue: '' },
  );

  readonly service = computed(() => {
    const slug = this.slug();
    return slug ? getServiceBySlug(slug, this.language()) : undefined;
  });

  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          back: 'Back to services',
          includes: 'What is included?',
          benefits: 'Benefits',
          technologies: 'Technologies',
          ctaTitle: 'Ready to get started?',
          ctaButton: 'Request a quote',
          notFoundTitle: 'Service not found',
          notFoundButton: 'View services',
        }
      : {
          back: 'Volver a servicios',
          includes: 'Qué incluye?',
          benefits: 'Beneficios',
          technologies: 'Tecnologías',
          ctaTitle: 'Listo para empezar?',
          ctaButton: 'Solicitar presupuesto',
          notFoundTitle: 'Servicio no encontrado',
          notFoundButton: 'Ver servicios',
        }
  ));
}
