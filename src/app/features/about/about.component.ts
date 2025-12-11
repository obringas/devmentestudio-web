import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- Hero -->
      <section class="py-24 lg:py-32 relative overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="text-primary-400 font-medium mb-4 block">Sobre Nosotros</span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-surface-100 mb-6">
              Pasión por el código, compromiso con los resultados
            </h1>
            <p class="text-surface-400 text-lg">
              Somos un equipo de desarrolladores apasionados por crear software 
              de calidad que realmente impacte en los negocios de nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="py-16 lg:py-24 bg-surface-900/30">
        <div class="container-custom">
          <div class="grid md:grid-cols-2 gap-12">
            <div>
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6">
                <svg class="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-display font-bold text-surface-100 mb-4">Nuestra Misión</h2>
              <p class="text-surface-400">
                Transformar ideas en soluciones digitales de alta calidad, ayudando a 
                empresas y emprendedores a alcanzar sus objetivos a través de la 
                tecnología. Creemos en el código limpio, las mejores prácticas y la 
                entrega de valor real.
              </p>
            </div>
            <div>
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500/20 to-primary-500/20 flex items-center justify-center mb-6">
                <svg class="w-7 h-7 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <h2 class="text-2xl font-display font-bold text-surface-100 mb-4">Nuestra Visión</h2>
              <p class="text-surface-400">
                Ser referentes en el desarrollo de software en la región, reconocidos 
                por la excelencia técnica, la innovación constante y el compromiso 
                con el éxito de cada proyecto que emprendemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-surface-100 mb-6">
              Nuestros Valores
            </h2>
            <p class="text-surface-400">
              Los principios que guían cada línea de código que escribimos.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @for (value of values; track value.title) {
              <div class="p-6 rounded-2xl bg-surface-900/50 border border-surface-800 text-center hover:border-surface-700 transition-colors">
                <div class="text-4xl mb-4">{{ value.icon }}</div>
                <h3 class="text-lg font-display font-semibold text-surface-100 mb-2">
                  {{ value.title }}
                </h3>
                <p class="text-surface-400 text-sm">
                  {{ value.description }}
                </p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Experience Timeline -->
      <section class="py-16 lg:py-24 bg-surface-900/30">
        <div class="container-custom">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-4xl font-display font-bold text-surface-100 mb-6">
              Nuestra Experiencia
            </h2>
            <p class="text-surface-400">
              Más de una década construyendo soluciones que funcionan.
            </p>
          </div>

          <div class="max-w-3xl mx-auto">
            <div class="space-y-8">
              @for (milestone of milestones; track milestone.year) {
                <div class="flex gap-6">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                      <span class="text-white font-bold">{{ milestone.year }}</span>
                    </div>
                  </div>
                  <div class="pt-2">
                    <h3 class="text-lg font-display font-semibold text-surface-100 mb-2">
                      {{ milestone.title }}
                    </h3>
                    <p class="text-surface-400">
                      {{ milestone.description }}
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            @for (stat of stats; track stat.label) {
              <div class="text-center">
                <div class="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  {{ stat.value }}
                </div>
                <div class="text-surface-400">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-16 lg:py-24 bg-surface-900/30">
        <div class="container-custom text-center">
          <h2 class="text-2xl md:text-3xl font-display font-bold text-surface-100 mb-4">
            ¿Querés conocernos mejor?
          </h2>
          <p class="text-surface-400 mb-8 max-w-2xl mx-auto">
            Nos encantaría escuchar sobre tu proyecto y contarte cómo podemos ayudarte.
          </p>
          <a routerLink="/contacto" class="btn-primary">
            Agendar una llamada
          </a>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly values = [
    {
      icon: '🎯',
      title: 'Excelencia',
      description: 'Nos esforzamos por superar expectativas en cada proyecto.',
    },
    {
      icon: '🤝',
      title: 'Compromiso',
      description: 'Tu éxito es nuestro éxito. Trabajamos como socios.',
    },
    {
      icon: '💡',
      title: 'Innovación',
      description: 'Siempre buscando las mejores soluciones tecnológicas.',
    },
    {
      icon: '🔒',
      title: 'Transparencia',
      description: 'Comunicación clara y honesta en todo momento.',
    },
  ];

  readonly milestones = [
    {
      year: '2024',
      title: 'Nace DevMenteStudio',
      description: 'Lanzamos oficialmente nuestra empresa de desarrollo de software.',
    },
    {
      year: '2020',
      title: 'Especialización en Angular',
      description: 'Nos convertimos en expertos en desarrollo frontend con Angular.',
    },
    {
      year: '2015',
      title: 'Primeros proyectos enterprise',
      description: 'Comenzamos a trabajar con sistemas empresariales complejos.',
    },
    {
      year: '2010',
      title: 'Inicio del camino',
      description: 'Nuestros primeros pasos en el mundo del desarrollo de software.',
    },
  ];

  readonly stats = [
    { value: '10+', label: 'Años de experiencia' },
    { value: '50+', label: 'Proyectos entregados' },
    { value: '100%', label: 'Clientes satisfechos' },
    { value: '24/7', label: 'Soporte disponible' },
  ];
}
