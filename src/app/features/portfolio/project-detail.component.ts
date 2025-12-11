import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom text-center">
        <h1 class="text-2xl font-display font-bold text-surface-100 mb-4">
          Proyecto no encontrado
        </h1>
        <a routerLink="/portfolio" class="btn-primary">Ver portfolio</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {}
