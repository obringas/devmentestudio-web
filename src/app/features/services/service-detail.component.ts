import { 
  Component, 
  inject,
  computed,
  ChangeDetectionStrategy 
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { getServiceBySlug } from '../../data';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (service(); as srv) {
      <div class="min-h-screen">
        <!-- Hero -->
        <section class="py-24 lg:py-32 relative overflow-hidden">
          <div class="absolute inset-0 -z-10">
            <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div class="container-custom">
            <a routerLink="/servicios" class="inline-flex items-center gap-2 text-surface-400 hover:text-primary-400 mb-8 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Volver a servicios
            </a>

            <div class="max-w-3xl">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-surface-100 mb-6">
                {{ srv.title }}
              </h1>
              <p class="text-surface-400 text-xl">
                {{ srv.fullDescription }}
              </p>
            </div>
          </div>
        </section>

        <!-- Features -->
        <section class="py-16 lg:py-24 bg-surface-900/30">
          <div class="container-custom">
            <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-12">
              ¿Qué incluye?
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (feature of srv.features; track feature) {
                <div class="p-6 rounded-xl bg-surface-900/50 border border-surface-800">
                  <svg class="w-8 h-8 text-accent-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <p class="text-surface-200">{{ feature }}</p>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Benefits -->
        <section class="py-16 lg:py-24">
          <div class="container-custom">
            <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-12">
              Beneficios
            </h2>
            <div class="grid md:grid-cols-3 gap-8">
              @for (benefit of srv.benefits; track benefit.title) {
                <div class="text-center">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 class="text-xl font-display font-semibold text-surface-100 mb-2">
                    {{ benefit.title }}
                  </h3>
                  <p class="text-surface-400">
                    {{ benefit.description }}
                  </p>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Technologies -->
        <section class="py-16 lg:py-24 bg-surface-900/30">
          <div class="container-custom">
            <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-12">
              Tecnologías
            </h2>
            <div class="flex flex-wrap gap-4">
              @for (tech of srv.technologies; track tech.name) {
                <div class="px-6 py-3 rounded-xl bg-surface-800 border border-surface-700">
                  <span class="text-surface-200 font-medium">{{ tech.name }}</span>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="py-16 lg:py-24">
          <div class="container-custom text-center">
            <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-4">
              ¿Listo para empezar?
            </h2>
            <p class="text-surface-400 mb-8 max-w-2xl mx-auto">
              {{ srv.cta.text }}
            </p>
            <a [routerLink]="srv.cta.href" class="btn-primary text-lg px-8 py-4">
              Solicitar Presupuesto
            </a>
          </div>
        </section>
      </div>
    } @else {
      <div class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-2xl font-display font-bold text-surface-100 mb-4">Servicio no encontrado</h1>
          <a routerLink="/servicios" class="btn-primary">Ver servicios</a>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  
  private readonly slug = toSignal(
    this.route.paramMap.pipe(map(params => params.get('slug') || ''))
  );

  readonly service = computed(() => {
    const slug = this.slug();
    return slug ? getServiceBySlug(slug) : undefined;
  });
}
