import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../../../../data';

@Component({
  selector: 'app-services-preview',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-24 lg:py-32 relative overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950 -z-10"></div>
      
      <div class="container-custom">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-primary-400 font-medium mb-4 block">Nuestros Servicios</span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-surface-100 mb-6">
            Soluciones digitales que impulsan tu negocio
          </h2>
          <p class="text-surface-400 text-lg">
            Desde landing pages de alto impacto hasta sistemas empresariales complejos, 
            tenemos la experiencia para hacer realidad tu visión.
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          @for (service of services; track service.id; let i = $index) {
            <a 
              [routerLink]="['/servicios', service.slug]"
              class="group relative p-8 rounded-2xl bg-surface-900/50 border border-surface-800 transition-all duration-500 hover:border-primary-500/50 hover:shadow-glow overflow-hidden"
            >
              <!-- Gradient on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative">
                <!-- Icon -->
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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

                <!-- Content -->
                <h3 class="text-xl font-display font-semibold text-surface-100 mb-3 group-hover:text-primary-400 transition-colors">
                  {{ service.title }}
                </h3>
                <p class="text-surface-400 mb-6">
                  {{ service.shortDescription }}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 mb-6">
                  @for (tech of service.technologies.slice(0, 4); track tech.name) {
                    <span class="px-3 py-1 text-xs rounded-full bg-surface-800 text-surface-300">
                      {{ tech.name }}
                    </span>
                  }
                </div>

                <!-- Link -->
                <div class="flex items-center text-primary-400 font-medium group-hover:gap-3 gap-2 transition-all">
                  <span>Conocer más</span>
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </a>
          }
        </div>

        <!-- CTA -->
        <div class="text-center mt-12">
          <a routerLink="/servicios" class="btn-outline">
            Ver todos los servicios
          </a>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPreviewComponent {
  readonly services = SERVICES;
}
