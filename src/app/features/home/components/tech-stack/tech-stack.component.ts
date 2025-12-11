import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { TECH_STACK } from '../../../../data';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  template: `
    <section class="py-24 lg:py-32 relative">
      <div class="container-custom">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-accent-400 font-medium mb-4 block">Stack Tecnológico</span>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-surface-100 mb-6">
            Tecnologías que dominamos
          </h2>
          <p class="text-surface-400 text-lg">
            Trabajamos con las herramientas más modernas y probadas de la industria 
            para garantizar resultados de calidad.
          </p>
        </div>

        <!-- Tech Grid - Infinite Scroll Effect -->
        <div class="relative overflow-hidden py-8">
          <!-- Gradient Masks -->
          <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface-950 to-transparent z-10"></div>
          <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface-950 to-transparent z-10"></div>
          
          <!-- First Row -->
          <div class="flex gap-6 mb-6 animate-scroll">
            @for (tech of techRow1; track tech.name) {
              <div class="flex-shrink-0 group">
                <div class="flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all">
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    [style.backgroundColor]="tech.color + '20'"
                  >
                    <span class="text-xl font-bold" [style.color]="tech.color">
                      {{ tech.name.charAt(0) }}
                    </span>
                  </div>
                  <span class="text-surface-300 font-medium whitespace-nowrap">{{ tech.name }}</span>
                </div>
              </div>
            }
            <!-- Duplicate for seamless loop -->
            @for (tech of techRow1; track tech.name + '-dup') {
              <div class="flex-shrink-0 group">
                <div class="flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all">
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    [style.backgroundColor]="tech.color + '20'"
                  >
                    <span class="text-xl font-bold" [style.color]="tech.color">
                      {{ tech.name.charAt(0) }}
                    </span>
                  </div>
                  <span class="text-surface-300 font-medium whitespace-nowrap">{{ tech.name }}</span>
                </div>
              </div>
            }
          </div>

          <!-- Second Row (Reverse) -->
          <div class="flex gap-6 animate-scroll-reverse">
            @for (tech of techRow2; track tech.name) {
              <div class="flex-shrink-0 group">
                <div class="flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all">
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    [style.backgroundColor]="tech.color + '20'"
                  >
                    <span class="text-xl font-bold" [style.color]="tech.color">
                      {{ tech.name.charAt(0) }}
                    </span>
                  </div>
                  <span class="text-surface-300 font-medium whitespace-nowrap">{{ tech.name }}</span>
                </div>
              </div>
            }
            <!-- Duplicate for seamless loop -->
            @for (tech of techRow2; track tech.name + '-dup') {
              <div class="flex-shrink-0 group">
                <div class="flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-surface-700 transition-all">
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center"
                    [style.backgroundColor]="tech.color + '20'"
                  >
                    <span class="text-xl font-bold" [style.color]="tech.color">
                      {{ tech.name.charAt(0) }}
                    </span>
                  </div>
                  <span class="text-surface-300 font-medium whitespace-nowrap">{{ tech.name }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes scroll-reverse {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    .animate-scroll {
      animation: scroll 30s linear infinite;
    }

    .animate-scroll-reverse {
      animation: scroll-reverse 30s linear infinite;
    }

    .animate-scroll:hover,
    .animate-scroll-reverse:hover {
      animation-play-state: paused;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent {
  private readonly allTech = TECH_STACK;
  
  readonly techRow1 = this.allTech.slice(0, Math.ceil(this.allTech.length / 2));
  readonly techRow2 = this.allTech.slice(Math.ceil(this.allTech.length / 2));
}
