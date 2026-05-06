import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom max-w-3xl text-center">
        <span class="mb-4 block font-medium text-primary-400">{{ copy().eyebrow }}</span>
        <h1 class="mb-6 text-4xl font-display font-bold text-surface-100 md:text-5xl">
          {{ copy().title }}
        </h1>
        <p class="mb-8 text-surface-400">
          {{ copy().description }}
        </p>
        <a routerLink="/contacto" class="btn-primary">{{ copy().cta }}</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'Blog',
          title: 'We are preparing technical content',
          description: 'Soon you will find articles about architecture, web development and better engineering practices.',
          cta: 'Let me know when it is live',
        }
      : {
          eyebrow: 'Blog',
          title: 'Estamos preparando contenido tecnico',
          description: 'Muy pronto vas a encontrar articulos sobre arquitectura, desarrollo web y buenas practicas.',
          cta: 'Quiero que me avisen',
        }
  ));
}
