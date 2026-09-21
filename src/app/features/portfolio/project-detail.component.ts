import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';
import { getPortfolioCaseBySlug } from '../../data/portfolio.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-20 lg:py-28">
      <div class="container-custom">
        <div class="mb-8">
          <a routerLink="/portfolio" class="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            {{ copy().backLink }}
          </a>
        </div>

        @if (project(); as item) {
          <article class="overflow-hidden rounded-3xl border-2 border-surface-200/80 bg-white shadow-lg p-6 sm:p-10 lg:p-12">
            <div class="mb-6 flex flex-wrap items-center gap-3">
              <span class="rounded-full bg-primary-500/10 px-3.5 py-1 text-xs font-semibold text-primary-700">
                {{ item.industry }}
              </span>
              <span class="rounded-full bg-surface-100 px-3.5 py-1 text-xs font-medium text-surface-600">
                {{ item.role }}
              </span>
            </div>

            <h1 class="mb-8 text-3xl font-display font-bold text-surface-900 md:text-4xl lg:text-5xl">
              {{ item.title }}
            </h1>

            <div class="mb-10 overflow-hidden rounded-2xl border border-surface-200/80 bg-surface-50">
              <img
                [src]="item.coverImage"
                [alt]="item.title"
                class="w-full max-h-[520px] object-cover object-center"
              />
            </div>

            <div class="grid gap-12 lg:grid-cols-12">
              <div class="lg:col-span-8 space-y-6 text-base leading-relaxed text-surface-600">
                <div>
                  <h2 class="text-xl font-display font-bold text-surface-900 mb-3">
                    {{ copy().challengeTitle }}
                  </h2>
                  <p>{{ item.summary }}</p>
                </div>

                <div>
                  <h2 class="text-xl font-display font-bold text-surface-900 mb-3">
                    {{ copy().solutionTitle }}
                  </h2>
                  <p class="border-l-4 border-primary-500 pl-4 py-1 text-surface-700 font-medium">
                    {{ item.solution }}
                  </p>
                </div>
              </div>

              <div class="lg:col-span-4 space-y-6">
                <div class="rounded-2xl border border-surface-200 bg-surface-50 p-6">
                  <h3 class="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-500">
                    {{ copy().techTitle }}
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of item.technologies; track tech) {
                      <span class="rounded-full border border-surface-200 bg-white px-3 py-1 text-xs font-medium text-surface-700">
                        {{ tech }}
                      </span>
                    }
                  </div>
                </div>

                <div class="rounded-2xl border border-primary-500/20 bg-primary-500/5 p-6">
                  <h3 class="mb-2 text-lg font-display font-bold text-surface-900">
                    {{ copy().ctaTitle }}
                  </h3>
                  <p class="mb-4 text-sm text-surface-600">
                    {{ copy().ctaText }}
                  </p>
                  <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary w-full text-center">
                    {{ copy().ctaBtn }}
                  </a>
                </div>
              </div>
            </div>
          </article>
        } @else {
          <div class="rounded-3xl border-2 border-surface-200/80 bg-white p-12 text-center">
            <h1 class="mb-4 text-2xl font-display font-bold text-surface-900">
              {{ copy().notFoundTitle }}
            </h1>
            <a routerLink="/portfolio" class="btn-primary">{{ copy().backLink }}</a>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  private readonly slug = computed(() => this.route.snapshot.paramMap.get('slug') ?? '');

  readonly project = computed(() =>
    getPortfolioCaseBySlug(this.slug(), this.language())
  );

  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          backLink: 'Back to portfolio',
          challengeTitle: 'Context & Challenge',
          solutionTitle: 'Implemented Solution',
          techTitle: 'Technologies',
          ctaTitle: 'Need a similar solution?',
          ctaText: 'We can evaluate your current software and craft a realistic technical proposal.',
          ctaBtn: 'Request diagnosis',
          notFoundTitle: 'Project not found',
        }
      : {
          backLink: 'Volver al portfolio',
          challengeTitle: 'Contexto y desafío',
          solutionTitle: 'Solución implementada',
          techTitle: 'Tecnologías',
          ctaTitle: '¿Necesitás una solución similar?',
          ctaText: 'Podemos evaluar tu software actual y diseñar una propuesta técnica realista.',
          ctaBtn: 'Pedir diagnóstico',
          notFoundTitle: 'Proyecto no encontrado',
        }
  ));
}
