import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom max-w-3xl text-center">
        <span class="text-primary-400 font-medium mb-4 block">Blog</span>
        <h1 class="text-4xl md:text-5xl font-display font-bold text-surface-100 mb-6">
          Estamos preparando contenido tecnico
        </h1>
        <p class="text-surface-400 mb-8">
          Muy pronto vas a encontrar articulos sobre arquitectura, desarrollo web y buenas practicas.
        </p>
        <a routerLink="/contacto" class="btn-primary">Quiero que me avisen</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {}
