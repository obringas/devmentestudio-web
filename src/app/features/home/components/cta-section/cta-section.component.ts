import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-24 lg:py-32 relative overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-surface-950 to-accent-900/20"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container-custom">
        <div class="relative max-w-4xl mx-auto text-center">
          <!-- Decorative Elements -->
          <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl rotate-12 opacity-20 blur-sm"></div>
          
          <span class="inline-block text-primary-400 font-medium mb-4">¿Listo para empezar?</span>
          
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-surface-100 mb-6">
            Hagamos realidad tu próximo proyecto
          </h2>
          
          <p class="text-surface-400 text-lg max-w-2xl mx-auto mb-10">
            Ya sea que necesites una landing page, un e-commerce completo o 
            consultoría especializada, estamos aquí para ayudarte a alcanzar 
            tus objetivos digitales.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              routerLink="/contacto" 
              class="btn-primary text-lg px-8 py-4"
            >
              Contactar ahora
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a 
              href="https://wa.me/5493877XXXXXX" 
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary text-lg px-8 py-4"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          <!-- Trust Indicators -->
          <div class="mt-16 pt-16 border-t border-surface-800">
            <p class="text-surface-500 mb-6">Confían en nosotros</p>
            <div class="flex flex-wrap justify-center items-center gap-8 opacity-50">
              <!-- Placeholder logos - replace with actual client logos -->
              @for (i of [1, 2, 3, 4, 5]; track i) {
                <div class="w-24 h-8 bg-surface-700 rounded"></div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSectionComponent {}
