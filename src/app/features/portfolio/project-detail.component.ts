import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom px-6 text-center">
        <h1 class="mb-4 text-2xl font-display font-bold text-surface-900">
          {{ copy().title }}
        </h1>
        <a routerLink="/portfolio" class="btn-primary">{{ copy().button }}</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          title: 'Project not found',
          button: 'View portfolio',
        }
      : {
          title: 'Proyecto no encontrado',
          button: 'Ver portfolio',
        }
  ));
}
