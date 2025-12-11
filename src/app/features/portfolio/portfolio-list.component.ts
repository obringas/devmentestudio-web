import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- Hero -->
      <section class="py-24 lg:py-32 relative overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="text-accent-400 font-medium mb-4 block">Portfolio</span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-surface-100 mb-6">
              Proyectos que hablan por sí solos
            </h1>
            <p class="text-surface-400 text-lg">
              Una muestra de nuestro trabajo y los resultados que hemos logrado 
              para nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      <!-- Coming Soon -->
      <section class="py-24 lg:py-32">
        <div class="container-custom">
          <div class="max-w-2xl mx-auto text-center">
            <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-8">
              <svg class="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-4">
              Próximamente
            </h2>
            <p class="text-surface-400 mb-8">
              Estamos preparando una galería increíble con nuestros mejores proyectos. 
              Mientras tanto, ¡contanos sobre tu proyecto!
            </p>
            <a routerLink="/contacto" class="btn-primary">
              Iniciar conversación
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioListComponent {}
