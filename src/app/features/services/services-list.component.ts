import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../data';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <section class="py-24 lg:py-32 relative overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="text-primary-400 font-medium mb-4 block">Nuestros Servicios</span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-surface-100 mb-6">
              Soluciones digitales para cada necesidad
            </h1>
            <p class="text-surface-400 text-lg">
              Desde landing pages de alto impacto hasta sistemas empresariales complejos, 
              ofrecemos soluciones integrales para impulsar tu negocio.
            </p>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="grid gap-8">
            @for (service of services; track service.id; let i = $index) {
              <a 
                [routerLink]="['/servicios', service.slug]"
                class="group grid lg:grid-cols-2 gap-8 p-8 rounded-2xl bg-surface-900/50 border border-surface-800 hover:border-primary-500/50 transition-all duration-500"
                [class.lg:flex-row-reverse]="i % 2 === 1"
              >
                <!-- Content -->
                <div class="flex flex-col justify-center">
                  <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6">
                    @switch (service.icon) {
                      @case ('rocket') {
                        <svg class="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                        </svg>
                      }
                      @case ('shopping-cart') {
                        <svg class="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                      }
                      @case ('code') {
                        <svg class="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                      }
                      @case ('lightbulb') {
                        <svg class="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                      }
                    }
                  </div>
                  
                  <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-4 group-hover:text-primary-400 transition-colors">
                    {{ service.title }}
                  </h2>
                  
                  <p class="text-surface-400 mb-6">
                    {{ service.fullDescription }}
                  </p>

                  <div class="flex flex-wrap gap-2 mb-6">
                    @for (tech of service.technologies; track tech.name) {
                      <span class="px-3 py-1 text-xs rounded-full bg-surface-800 text-surface-300">
                        {{ tech.name }}
                      </span>
                    }
                  </div>

                  <div class="flex items-center text-primary-400 font-medium">
                    <span>Ver detalles</span>
                    <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </div>

                <!-- Features -->
                <div class="bg-surface-800/30 rounded-xl p-6">
                  <h3 class="text-lg font-semibold text-surface-200 mb-4">Incluye:</h3>
                  <ul class="space-y-3">
                    @for (feature of service.features; track feature) {
                      <li class="flex items-start gap-3">
                        <svg class="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span class="text-surface-300">{{ feature }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-16 lg:py-24 bg-surface-900/30">
        <div class="container-custom text-center">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-4">
            ¿No encontrás lo que buscás?
          </h2>
          <p class="text-surface-400 mb-8 max-w-2xl mx-auto">
            Contanos tu proyecto y encontramos la solución perfecta para vos.
          </p>
          <a routerLink="/contacto" class="btn-primary">
            Contactanos
          </a>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent {
  readonly services = SERVICES;
}
