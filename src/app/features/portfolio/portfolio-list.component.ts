import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <section class="relative overflow-hidden py-24 lg:py-32">
        <div class="absolute inset-0 -z-10">
          <div class="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"></div>
        </div>

        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="mb-4 block font-medium text-accent-400">{{ copy().eyebrow }}</span>
            <h1 class="mb-6 text-4xl font-display font-bold text-surface-900 md:text-5xl lg:text-6xl">
              {{ copy().title }}
            </h1>
            <p class="text-lg text-surface-500">
              {{ copy().description }}
            </p>
          </div>
        </div>
      </section>

      <section class="py-24 lg:py-32">
        <div class="container-custom">
          <div class="mx-auto max-w-2xl text-center">
            <div class="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
              <svg class="h-12 w-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h2 class="mb-4 text-2xl font-display font-bold text-surface-900 md:text-3xl">
              {{ copy().comingSoonTitle }}
            </h2>
            <p class="mb-8 text-surface-500">
              {{ copy().comingSoonDescription }}
            </p>
            <a routerLink="/contacto" class="btn-primary">
              {{ copy().cta }}
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
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'Portfolio',
          title: 'Projects that speak for themselves',
          description: 'A sample of the kind of digital work and outcomes we aim to deliver for our clients.',
          comingSoonTitle: 'Coming soon',
          comingSoonDescription:
            'We are preparing a stronger project gallery. In the meantime, tell us about your idea and we will show you what we can build.',
          cta: 'Start the conversation',
        }
      : {
          eyebrow: 'Portfolio',
          title: 'Proyectos que hablan por si solos',
          description: 'Una muestra del trabajo y de los resultados que buscamos construir para nuestros clientes.',
          comingSoonTitle: 'Proximamente',
          comingSoonDescription:
            'Estamos preparando una galeria mas fuerte con nuestros mejores proyectos. Mientras tanto, contanos sobre tu idea y te mostramos lo que podemos construir.',
          cta: 'Iniciar conversacion',
        }
  ));
}
