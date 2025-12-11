import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative min-h-[90vh] flex items-center overflow-hidden">
      <!-- Background Effects -->
      <div class="absolute inset-0 -z-10">
        <!-- Gradient Orbs -->
        <div class="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
        
        <!-- Grid Pattern -->
        <div class="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        <!-- Noise Overlay -->
        <div class="absolute inset-0 opacity-[0.015]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E');"></div>
      </div>

      <div class="container-custom relative">
        <div class="max-w-4xl">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-fade-in">
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
            <span class="text-sm text-primary-300">Disponible para nuevos proyectos</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-slide-up">
            <span class="text-surface-100">Transformamos ideas en</span>
            <br />
            <span class="text-gradient">software excepcional</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-lg sm:text-xl text-surface-400 max-w-2xl mb-10 animate-slide-up animation-delay-100">
            Desarrollo de landing pages, e-commerce y aplicaciones a medida. 
            Consultoría en arquitectura de software y mejores prácticas para 
            llevar tu proyecto al siguiente nivel.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-200">
            <a 
              routerLink="/contacto" 
              class="btn-primary text-lg px-8 py-4"
            >
              Iniciar Proyecto
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a 
              routerLink="/portfolio" 
              class="btn-secondary text-lg px-8 py-4"
            >
              Ver Portfolio
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-surface-800 animate-slide-up animation-delay-300">
            <div>
              <div class="text-3xl sm:text-4xl font-display font-bold text-surface-100">50+</div>
              <div class="text-surface-500 mt-1">Proyectos entregados</div>
            </div>
            <div>
              <div class="text-3xl sm:text-4xl font-display font-bold text-surface-100">10+</div>
              <div class="text-surface-500 mt-1">Años de experiencia</div>
            </div>
            <div>
              <div class="text-3xl sm:text-4xl font-display font-bold text-surface-100">100%</div>
              <div class="text-surface-500 mt-1">Clientes satisfechos</div>
            </div>
          </div>
        </div>

        <!-- Decorative Code Block -->
        <div class="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-96">
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl"></div>
            <div class="relative bg-surface-900/90 backdrop-blur-xl border border-surface-700 rounded-2xl p-6 font-mono text-sm">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre class="text-surface-300"><code><span class="text-primary-400">const</span> <span class="text-accent-400">proyecto</span> = <span class="text-primary-400">await</span> <span class="text-surface-100">DevMenteStudio</span>
  .<span class="text-accent-400">crear</span>(&#123;
    <span class="text-surface-500">idea:</span> <span class="text-green-400">'Tu visión'</span>,
    <span class="text-surface-500">calidad:</span> <span class="text-green-400">'Excepcional'</span>,
    <span class="text-surface-500">entrega:</span> <span class="text-green-400">'A tiempo'</span>
  &#125;);

<span class="text-surface-500">// Resultado: 🚀</span></code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
