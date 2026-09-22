import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- HERO -->
      <section class="relative overflow-hidden py-20 lg:py-32">
        <div class="absolute inset-0 -z-10">
          <div class="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl"></div>
          <div class="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-primary-300/10 blur-3xl"></div>
        </div>

        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
              {{ copy().eyebrow }}
            </span>
            <h1 class="mb-6 text-4xl font-display font-bold leading-tight text-surface-900 md:text-5xl lg:text-6xl">
              {{ copy().title }}
            </h1>
            <p class="text-lg leading-relaxed text-surface-600 md:text-xl">
              {{ copy().lead }}
            </p>
          </div>
        </div>
      </section>

      <!-- HISTORIA Y PRESENTACIÓN -->
      <section class="bg-surface-50 py-16 lg:py-24 border-y border-surface-200">
        <div class="container-custom">
          <div class="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div class="lg:col-span-8 space-y-6 text-base leading-relaxed text-surface-700 sm:text-lg">
              <p>
                {{ copy().bio1 }}
              </p>
              <p>
                {{ copy().bio2 }}
              </p>
              <div class="rounded-2xl border-2 border-surface-200 bg-white p-6 shadow-sm">
                <p class="font-medium text-surface-900">
                  {{ copy().bio3 }}
                </p>
              </div>
            </div>

            <div class="lg:col-span-4">
              <div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
                <div class="about-portrait" role="img" [attr.aria-label]="copy().photoPending">
                  <span>OB</span>
                  <small>{{ copy().photoPending }}</small>
                </div>
                <h3 class="mt-6 text-xl font-display font-bold text-surface-900">Oscar Bringas</h3>
                <p class="text-sm font-medium text-primary-600 mb-4">{{ copy().profileRole }}</p>
                <ul class="space-y-2 text-sm text-surface-600">
                  <li class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Ing. en Sistemas de Información (UTN)</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>+15 años Líder Técnico .NET</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>20 años con SQL Server</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>Salta, Argentina</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- VALORES -->
      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="mx-auto mb-16 max-w-3xl text-center">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
              {{ copy().valuesEyebrow }}
            </span>
            <h2 class="mt-3 mb-4 text-3xl font-display font-bold text-surface-900 md:text-4xl">
              {{ copy().valuesTitle }}
            </h2>
            <p class="text-surface-600">
              {{ copy().valuesDescription }}
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            @for (value of copy().values; track value.title) {
              <div class="rounded-2xl border-2 border-surface-200/80 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
                <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 font-bold">
                  {{ value.number }}
                </div>
                <h3 class="mb-2 text-lg font-display font-bold text-surface-900">{{ value.title }}</h3>
                <p class="text-sm leading-relaxed text-surface-600">{{ value.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- LÍNEA DE TIEMPO -->
      <section class="bg-surface-50 py-16 lg:py-24 border-y border-surface-200">
        <div class="container-custom">
          <div class="mx-auto mb-16 max-w-3xl text-center">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">
              {{ copy().timelineEyebrow }}
            </span>
            <h2 class="mt-3 text-3xl font-display font-bold text-surface-900 md:text-4xl">
              {{ copy().timelineTitle }}
            </h2>
          </div>

          <div class="mx-auto max-w-3xl">
            <div class="space-y-8">
              @for (milestone of copy().milestones; track milestone.year) {
                <div class="flex gap-4 sm:gap-6 items-start rounded-2xl border-2 border-surface-200/80 bg-white p-6 shadow-sm">
                  <div class="flex-shrink-0">
                    <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/15 to-primary-200/30 text-primary-700 font-display font-bold text-sm sm:text-base border border-primary-500/20">
                      {{ milestone.year }}
                    </div>
                  </div>
                  <div class="pt-1">
                    <h3 class="mb-1.5 text-lg font-display font-bold text-surface-900">{{ milestone.title }}</h3>
                    <p class="text-sm leading-relaxed text-surface-600">{{ milestone.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- NÚMEROS REALES -->
      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
            @for (stat of copy().stats; track stat.label) {
              <div class="rounded-2xl border-2 border-surface-200/80 bg-white p-6 text-center shadow-sm">
                <div class="mb-2 text-3xl font-display font-bold text-primary-600 md:text-4xl">{{ stat.value }}</div>
                <div class="text-sm font-medium text-surface-600">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CIERRE -->
      <section class="bg-surface-50 py-16 lg:py-24 border-t border-surface-200">
        <div class="container-custom text-center max-w-2xl mx-auto">
          <h2 class="mb-4 text-2xl font-display font-bold text-surface-900 md:text-3xl">
            {{ copy().ctaTitle }}
          </h2>
          <p class="mb-8 text-surface-600">
            {{ copy().ctaDescription }}
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a routerLink="/contacto" class="btn-primary">
              {{ copy().ctaButton }}
            </a>
            <a routerLink="/modernizacion" class="btn-outline">
              {{ copy().ctaModernization }}
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: `
    .about-portrait{aspect-ratio:4/5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;border-radius:.85rem;background:#263d56;color:#fff}.about-portrait span{font-family:'Cormorant Garamond',Georgia,serif;font-size:5rem;line-height:1;color:#8bcdfb}.about-portrait small{max-width:12rem;color:#d4e0e9;font-size:.72rem;line-height:1.4;text-align:center}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'About DevMenteStudio',
          title: 'Behind DevMenteStudio there is a person with a name',
          lead: 'DevMenteStudio is the studio through which I work, Oscar Bringas, Information Systems Engineer graduated from UTN.',
          bio1: 'More than 15 years as a .NET technical lead and 20 years working with SQL Server, in companies where software is not the promotional product but the critical backbone on which daily operations depend.',
          bio2: 'Today I lead the IT department of an agroindustrial cooperative in northern Argentina and work as a senior .NET consultant in the insurance industry. That means I know both sides intimately: sustaining an active system that cannot fail, and architecting the new one that replaces it.',
          bio3: 'When I take on projects that exceed what I can handle alone, I bring in trusted senior colleagues. But the technical responsibility, architectural oversight, and primary point of contact always remain with me.',
          profileRole: 'Lead Engineer & Consultant',
          photoPending: 'Oscar portrait · final photo pending',
          valuesEyebrow: 'Principles',
          valuesTitle: 'How we make decisions',
          valuesDescription: 'The engineering standards behind every line of code shipped in production.',
          values: [
            {
              number: '01',
              title: 'Judgment over speed',
              description: 'In systems that sustain an operation, the right decision is worth far more than rushed delivery.',
            },
            {
              number: '02',
              title: 'Gradual and reversible changes',
              description: 'Every single step in production must be capable of being undone cleanly.',
            },
            {
              number: '03',
              title: 'Honest expectations',
              description: 'If I do not master something, I say so. If a project does not make sense, I say that too.',
            },
            {
              number: '04',
              title: 'Code anyone can maintain',
              description: 'Clean architecture and clear documentation, so you do not depend on me forever.',
            },
          ],
          timelineEyebrow: 'Trajectory',
          timelineTitle: 'Milestones & Experience',
          milestones: [
            {
              year: '2024',
              title: 'DevMenteStudio launches',
              description: 'Official launch of the studio to deliver modern software, legacy modernization, and technical consulting.',
            },
            {
              year: '2015',
              title: 'Enterprise systems & critical databases',
              description: 'Architecting high-availability platforms, transactional replication to Azure, and fiscal webservice integrations.',
            },
            {
              year: '2010',
              title: 'Technical leadership in .NET',
              description: 'Leading mission-critical software engineering, database optimizations, and core system cohabitation.',
            },
            {
              year: '2005-2006',
              title: 'Beginning of the professional journey',
              description: 'First professional implementations with relational databases, SQL Server, and enterprise systems.',
            },
          ],
          stats: [
            { value: '20 years', label: 'Professional experience' },
            { value: '50+', label: 'Delivered projects' },
            { value: 'Today', label: 'Systems in production' },
            { value: 'Salta', label: 'Argentina' },
          ],
          ctaTitle: 'Want to talk directly about your system?',
          ctaDescription: 'Tell us what challenges you are facing with your software or database, and we will analyze a realistic path forward.',
          ctaButton: 'Get in touch',
          ctaModernization: 'View modernization service',
        }
      : {
          eyebrow: 'Sobre Nosotros',
          title: 'Detrás de DevMenteStudio hay una persona con nombre',
          lead: 'DevMenteStudio es el estudio desde el que trabajo, Oscar Bringas, ingeniero en sistemas de información egresado de la UTN.',
          bio1: 'Más de 15 años como líder técnico en desarrollo .NET y 20 trabajando con SQL Server, en empresas donde el software no es el producto sino la herramienta de la que depende la operación todos los días.',
          bio2: 'Hoy lidero el área de sistemas de una cooperativa agroindustrial del norte argentino y trabajo como consultor senior .NET en el sector seguros. Eso significa que conozco los dos lados: el de quien tiene que sostener un sistema que no puede fallar, y el de quien tiene que construir el que viene.',
          bio3: 'Cuando trabajo en proyectos que exceden lo que puedo hacer solo, sumo profesionales de confianza. Pero la responsabilidad técnica y el interlocutor son siempre los mismos.',
          profileRole: 'Líder Técnico y Consultor',
          photoPending: 'Retrato de Oscar · foto definitiva pendiente',
          valuesEyebrow: 'Principios',
          valuesTitle: 'Nuestros Valores',
          valuesDescription: 'Criterios claros que guían cada decisión técnica y arquitectónica.',
          values: [
            {
              number: '01',
              title: 'Criterio antes que velocidad',
              description: 'En sistemas que sostienen una operación, la decisión correcta vale más que la entrega rápida.',
            },
            {
              number: '02',
              title: 'Cambios graduales y reversibles',
              description: 'Todo paso en producción tiene que poder deshacerse.',
            },
            {
              number: '03',
              title: 'Expectativas honestas',
              description: 'Si algo no lo domino, lo digo. Si un proyecto no me cierra, también.',
            },
            {
              number: '04',
              title: 'Código que otro pueda mantener',
              description: 'Arquitectura limpia y documentación, para que no dependas de mí para siempre.',
            },
          ],
          timelineEyebrow: 'Trayectoria',
          timelineTitle: 'Línea de tiempo',
          milestones: [
            {
              year: '2024',
              title: 'Nace DevMenteStudio',
              description: 'Lanzamiento oficial del estudio enfocado en modernización de sistemas, arquitectura .NET y desarrollo a medida.',
            },
            {
              year: '2015',
              title: 'Sistemas empresariales y datos críticos',
              description: 'Consolidación en plataformas de alta disponibilidad, replicación hacia Azure e integraciones de facturación.',
            },
            {
              year: '2010',
              title: 'Liderazgo técnico .NET',
              description: 'Dirección de proyectos de software centrales, convivencia de sistemas y optimización de bases de datos.',
            },
            {
              year: '2005-2006',
              title: 'Inicio del camino profesional',
              description: 'Primeros desarrollos profesionales con bases de datos relacionales, SQL Server y sistemas de gestión.',
            },
          ],
          stats: [
            { value: '20 años', label: 'De experiencia profesional' },
            { value: '50+', label: 'Proyectos entregados' },
            { value: 'Hoy', label: 'Sistemas en producción' },
            { value: 'Salta', label: 'Argentina' },
          ],
          ctaTitle: '¿Querés hablar directamente sobre tu sistema?',
          ctaDescription: 'Contanos qué desafíos tenés con tu software o base de datos y analizamos una propuesta técnica clara.',
          ctaButton: 'Contactar',
          ctaModernization: 'Ver modernización de sistemas',
        }
  ));
}
