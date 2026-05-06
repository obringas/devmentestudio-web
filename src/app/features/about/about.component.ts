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
      <section class="relative overflow-hidden py-24 lg:py-32">
        <div class="absolute inset-0 -z-10">
          <div class="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl"></div>
          <div class="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"></div>
        </div>

        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="mb-4 block font-medium text-primary-400">{{ copy().eyebrow }}</span>
            <h1 class="mb-6 text-4xl font-display font-bold text-surface-900 md:text-5xl lg:text-6xl">
              {{ copy().title }}
            </h1>
            <p class="text-lg text-surface-500">
              {{ copy().description }}
            </p>
          </div>
        </div>
      </section>

      <section class="bg-surface-50 py-16 lg:py-24">
        <div class="container-custom">
          <div class="grid gap-12 md:grid-cols-2">
            @for (item of copy().missionVision; track item.title) {
              <div>
                <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                  <svg class="h-7 w-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    @if (item.key === 'vision') {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    } @else {
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    }
                  </svg>
                </div>
                <h2 class="mb-4 text-2xl font-display font-bold text-surface-900">{{ item.title }}</h2>
                <p class="text-surface-500">{{ item.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="mx-auto mb-16 max-w-3xl text-center">
            <h2 class="mb-6 text-3xl font-display font-bold text-surface-900 md:text-4xl">
              {{ copy().valuesTitle }}
            </h2>
            <p class="text-surface-500">
              {{ copy().valuesDescription }}
            </p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            @for (value of copy().values; track value.title) {
              <div class="rounded-2xl border border-surface-200 bg-surface-50 p-6 text-center transition-colors hover:border-surface-200">
                <div class="mb-4 text-4xl">{{ value.icon }}</div>
                <h3 class="mb-2 text-lg font-display font-semibold text-surface-900">{{ value.title }}</h3>
                <p class="text-sm text-surface-500">{{ value.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="bg-surface-50 py-16 lg:py-24">
        <div class="container-custom">
          <div class="mx-auto mb-16 max-w-3xl text-center">
            <h2 class="mb-6 text-3xl font-display font-bold text-surface-900 md:text-4xl">
              {{ copy().experienceTitle }}
            </h2>
            <p class="text-surface-500">
              {{ copy().experienceDescription }}
            </p>
          </div>

          <div class="mx-auto max-w-3xl">
            <div class="space-y-8">
              @for (milestone of copy().milestones; track milestone.year) {
                <div class="flex gap-4 sm:gap-6">
                  <div class="flex-shrink-0">
                    <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 sm:h-16 sm:w-16">
                      <span class="text-sm font-bold text-surface-900 sm:text-base">{{ milestone.year }}</span>
                    </div>
                  </div>
                  <div class="pt-2">
                    <h3 class="mb-2 text-lg font-display font-semibold text-surface-900">{{ milestone.title }}</h3>
                    <p class="text-surface-500">{{ milestone.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
            @for (stat of copy().stats; track stat.label) {
              <div class="text-center">
                <div class="mb-2 text-4xl font-display font-bold text-gradient md:text-5xl">{{ stat.value }}</div>
                <div class="text-surface-500">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="bg-surface-50 py-16 lg:py-24">
        <div class="container-custom text-center">
          <h2 class="mb-4 text-2xl font-display font-bold text-surface-900 md:text-3xl">
            {{ copy().ctaTitle }}
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-surface-500">
            {{ copy().ctaDescription }}
          </p>
          <a routerLink="/contacto" class="btn-primary">
            {{ copy().ctaButton }}
          </a>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'About Us',
          title: 'Passion for code, commitment to outcomes',
          description:
            'We are a software studio focused on building high-quality digital products that create real business impact.',
          missionVision: [
            {
              key: 'mission',
              title: 'Our Mission',
              description:
                'Turn ideas into high-quality digital solutions that help companies and founders reach their goals through technology, clean code and strong execution.',
            },
            {
              key: 'vision',
              title: 'Our Vision',
              description:
                "Become a regional reference in software development, recognized for technical excellence, thoughtful design and commitment to each project's success.",
            },
          ],
          valuesTitle: 'Our Values',
          valuesDescription: 'The principles behind every product decision and every line of code we ship.',
          values: [
            { icon: 'Precision', title: 'Excellence', description: 'We aim to exceed expectations in every project.' },
            { icon: 'Trust', title: 'Commitment', description: 'Your business outcome matters to us like it is our own.' },
            { icon: 'Ideas', title: 'Innovation', description: 'We keep looking for sharper and more durable solutions.' },
            { icon: 'Clarity', title: 'Transparency', description: 'Clear communication and honest expectations at every stage.' },
          ],
          experienceTitle: 'Our Experience',
          experienceDescription: 'More than a decade building software that actually works for real businesses.',
          milestones: [
            { year: '2024', title: 'DevMenteStudio launches', description: 'We officially launched the studio as a focused software development company.' },
            { year: '2020', title: 'Angular specialization', description: 'We deepened our frontend expertise in modern Angular applications.' },
            { year: '2015', title: 'First enterprise projects', description: 'We started working with more complex business systems and internal tools.' },
            { year: '2010', title: 'The journey begins', description: 'Our first steps in software development and digital product delivery.' },
          ],
          stats: [
            { value: '10+', label: 'Years of experience' },
            { value: '50+', label: 'Projects delivered' },
            { value: '100%', label: 'Focus on quality' },
            { value: '24/7', label: 'Digital business mindset' },
          ],
          ctaTitle: 'Want to know us better?',
          ctaDescription: 'We would love to hear about your project and show you how we can help.',
          ctaButton: 'Book a call',
        }
      : {
          eyebrow: 'Sobre Nosotros',
          title: 'Pasion por el codigo, compromiso con los resultados',
          description:
            'Somos un equipo de desarrollo enfocado en crear software de calidad que realmente impacte en los negocios de nuestros clientes.',
          missionVision: [
            {
              key: 'mission',
              title: 'Nuestra Mision',
              description:
                'Transformar ideas en soluciones digitales de alta calidad, ayudando a empresas y emprendedores a alcanzar sus objetivos a traves de la tecnologia, el codigo limpio y una ejecucion solida.',
            },
            {
              key: 'vision',
              title: 'Nuestra Vision',
              description:
                'Ser referentes en desarrollo de software en la region, reconocidos por la excelencia tecnica, el diseno cuidado y el compromiso con el exito de cada proyecto.',
            },
          ],
          valuesTitle: 'Nuestros Valores',
          valuesDescription: 'Los principios que guian cada decision de producto y cada linea de codigo.',
          values: [
            { icon: 'Precision', title: 'Excelencia', description: 'Nos esforzamos por superar expectativas en cada proyecto.' },
            { icon: 'Trust', title: 'Compromiso', description: 'Tu resultado nos importa como si fuera propio.' },
            { icon: 'Ideas', title: 'Innovacion', description: 'Siempre buscamos soluciones mejores y mas duraderas.' },
            { icon: 'Clarity', title: 'Transparencia', description: 'Comunicacion clara y expectativas honestas en todo momento.' },
          ],
          experienceTitle: 'Nuestra Experiencia',
          experienceDescription: 'Mas de una decada construyendo soluciones que funcionan para negocios reales.',
          milestones: [
            { year: '2024', title: 'Nace DevMenteStudio', description: 'Lanzamos oficialmente el estudio como empresa de desarrollo de software.' },
            { year: '2020', title: 'Especializacion en Angular', description: 'Profundizamos nuestra experiencia frontend en aplicaciones modernas con Angular.' },
            { year: '2015', title: 'Primeros proyectos enterprise', description: 'Empezamos a trabajar con sistemas empresariales y herramientas internas mas complejas.' },
            { year: '2010', title: 'Inicio del camino', description: 'Nuestros primeros pasos en desarrollo de software y entrega de productos digitales.' },
          ],
          stats: [
            { value: '10+', label: 'Años de experiencia' },
            { value: '50+', label: 'Proyectos entregados' },
            { value: '100%', label: 'Foco en calidad' },
            { value: '24/7', label: 'Mentalidad digital' },
          ],
          ctaTitle: 'Queres conocernos mejor?',
          ctaDescription: 'Nos encantaria escuchar sobre tu proyecto y contarte como podemos ayudarte.',
          ctaButton: 'Agendar una llamada',
        }
  ));
}
