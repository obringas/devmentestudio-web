import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteConfig } from '../../config/site.config';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-modernization',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- HERO -->
      <section class="relative overflow-hidden py-20 lg:py-32">
        <div class="absolute inset-0 -z-10">
          <div class="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl"></div>
        </div>

        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="mb-4 inline-block rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
              {{ copy().hero.eyebrow }}
            </span>
            <h1 class="mb-6 text-4xl font-display font-bold leading-tight text-surface-900 md:text-5xl lg:text-6xl">
              {{ copy().hero.title }}
            </h1>
            <p class="mb-8 text-lg leading-relaxed text-surface-600 md:text-xl">
              {{ copy().hero.description }}
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">
                {{ copy().hero.primaryCta }}
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
              <a href="#como-trabajamos" class="btn-outline">
                {{ copy().hero.secondaryCta }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- SEÑALES DE QUE YA ES HORA -->
      <section class="bg-surface-50 py-16 lg:py-24 border-y border-surface-200">
        <div class="container-custom">
          <div class="max-w-3xl mb-12">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
              {{ copy().signals.eyebrow }}
            </span>
            <h2 class="mt-3 text-3xl font-display font-bold text-surface-900 md:text-4xl">
              {{ copy().signals.title }}
            </h2>
            <p class="mt-4 text-lg text-surface-600 font-medium">
              {{ copy().signals.intro }}
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            @for (signal of copy().signals.items; track signal.id) {
              <div class="rounded-2xl border-2 border-surface-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <h3 class="mb-2 text-lg font-display font-semibold text-surface-900">
                  {{ signal.title }}
                </h3>
                <p class="text-sm leading-relaxed text-surface-600">
                  {{ signal.description }}
                </p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CÓMO TRABAJAMOS -->
      <section id="como-trabajamos" class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="max-w-3xl mb-14">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">
              {{ copy().howWeWork.eyebrow }}
            </span>
            <h2 class="mt-3 text-3xl font-display font-bold text-surface-900 md:text-4xl">
              {{ copy().howWeWork.title }}
            </h2>
          </div>

          <div class="grid gap-8 md:grid-cols-2">
            @for (pillar of copy().howWeWork.pillars; track pillar.number) {
              <div class="rounded-2xl border-2 border-surface-200/80 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div class="mb-4 flex items-center justify-between">
                  <span class="text-2xl font-display font-bold text-primary-500">{{ pillar.number }}</span>
                  <span class="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-600">
                    {{ pillar.tag }}
                  </span>
                </div>
                <h3 class="mb-3 text-xl font-display font-bold text-surface-900">
                  {{ pillar.title }}
                </h3>
                <p class="text-base leading-relaxed text-surface-600">
                  {{ pillar.description }}
                </p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- SERVICIOS -->
      <section class="bg-surface-50 py-16 lg:py-24 border-y border-surface-200">
        <div class="container-custom">
          <div class="max-w-3xl mb-14">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
              {{ copy().services.eyebrow }}
            </span>
            <h2 class="mt-3 text-3xl font-display font-bold text-surface-900 md:text-4xl">
              {{ copy().services.title }}
            </h2>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            @for (service of copy().services.items; track service.code) {
              <div class="flex flex-col justify-between rounded-2xl border-2 border-surface-200/80 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div class="flex items-center gap-3 mb-4">
                    <span class="text-sm font-semibold tracking-wider text-accent-500">{{ service.code }}</span>
                    <span class="h-1.5 w-1.5 rounded-full bg-accent-400"></span>
                    <h3 class="text-xl font-display font-bold text-surface-900">{{ service.title }}</h3>
                  </div>
                  <p class="text-base leading-relaxed text-surface-600 mb-6">
                    {{ service.description }}
                  </p>
                </div>
                <div class="pt-4 border-t border-surface-100 flex items-center justify-between">
                  <span class="text-xs font-medium uppercase tracking-wider text-surface-500">{{ service.deliverable }}</span>
                  <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    {{ copy().services.cta }}
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CON QUIÉN VAS A TRABAJAR -->
      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="rounded-3xl border-2 border-surface-200/80 bg-white p-8 lg:p-12 shadow-md">
            <div class="max-w-3xl">
              <span class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">
                {{ copy().aboutMe.eyebrow }}
              </span>
              <h2 class="mt-3 mb-6 text-3xl font-display font-bold text-surface-900 md:text-4xl">
                {{ copy().aboutMe.title }}
              </h2>
              <div class="space-y-4 text-base leading-relaxed text-surface-600">
                <p>
                  {{ copy().aboutMe.paragraph1 }}
                </p>
                <p class="rounded-xl border border-primary-500/20 bg-primary-500/5 p-4 font-medium text-surface-800">
                  {{ copy().aboutMe.paragraph2 }}
                </p>
              </div>

              <div class="mt-8 flex flex-wrap gap-3">
                @for (chip of copy().aboutMe.chips; track chip) {
                  <span class="rounded-full border border-surface-200 bg-surface-50 px-3.5 py-1.5 text-xs font-medium text-surface-700">
                    {{ chip }}
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CIERRE -->
      <section class="bg-surface-50 py-16 lg:py-24 border-t border-surface-200">
        <div class="container-custom text-center max-w-3xl mx-auto">
          <h2 class="mb-4 text-3xl font-display font-bold text-surface-900 md:text-4xl">
            {{ copy().closing.title }}
          </h2>
          <p class="mb-8 text-lg text-surface-600">
            {{ copy().closing.text }}
          </p>
          <div class="flex flex-col items-center gap-3">
            <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">
              {{ copy().closing.primaryBtn }}
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
            <div class="flex flex-wrap justify-center gap-3">
              <a [href]="'mailto:' + contactEmail" class="btn-secondary flex items-center gap-2 whitespace-nowrap text-sm">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ contactEmail }}
              </a>
              <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary flex items-center gap-2 whitespace-nowrap text-sm">
                <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {{ copy().closing.secondaryBtn }}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModernizationComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly contactEmail = siteConfig.contact.email;
  readonly whatsappUrl = siteConfig.contact.whatsappUrl;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          hero: {
            eyebrow: 'LEGACY SYSTEMS MODERNIZATION',
            title: 'Your legacy system still sustains the business. That is the problem.',
            description:
              'We migrate Visual FoxPro, Visual Basic, and Clipper systems to .NET 8 and SQL Server gradually: your existing system keeps running while the new platform grows alongside it. No downtime, no big bang, reversible at every step.',
            primaryCta: 'Request a technical diagnosis',
            secondaryCta: 'See how we work',
          },
          signals: {
            eyebrow: 'Diagnosis',
            title: 'Signs that it is already time',
            intro: 'If you recognize two or more of these, the problem is no longer technical: it is business continuity.',
            items: [
              {
                id: 1,
                title: 'Only one person understands the system',
                description: 'If that person leaves or gets sick, the company is completely exposed.',
              },
              {
                id: 2,
                title: 'Every regulatory/fiscal change is an emergency',
                description: 'Invoicing relies on last-minute patches and improvisation.',
              },
              {
                id: 3,
                title: 'Nobody wants to touch it',
                description: 'Business requests pile up because modifying the system causes fear.',
              },
              {
                id: 4,
                title: 'No staging environment or verified backups',
                description: 'Changes are tested straight in production with fingers crossed.',
              },
              {
                id: 5,
                title: 'Data lives in DBF files or parallel spreadsheets',
                description: 'Not in a modern, queryable database that can power reporting.',
              },
              {
                id: 6,
                title: 'The original vendor is gone',
                description: 'Or barely maintains the software without ever evolving it.',
              },
            ],
          },
          howWeWork: {
            eyebrow: 'Methodology',
            title: 'How we work',
            pillars: [
              {
                number: '01',
                tag: 'Risk reduction',
                title: 'Gradual, not big bang',
                description:
                  'A full rewrite of an active system is the most expensive and risky path. We work module by module: the legacy system and the new platform coexist, share data, and parts are replaced one by one starting with the lowest risk.',
              },
              {
                number: '02',
                tag: 'Discovery',
                title: 'Understand first, touch later',
                description:
                  'A 20-year-old system carries undocumented business rules critical to the company. Before writing code, we thoroughly map what the system does and why.',
              },
              {
                number: '03',
                tag: 'Safety',
                title: 'Reversible at every step',
                description:
                  'Every stage can be rolled back. If a new module does not perform as expected, you can revert to the previous version without losing data or operational days.',
              },
              {
                number: '04',
                tag: 'Independence',
                title: 'Documented and transferable',
                description:
                  'The goal is not vendor lock-in: it is to leave your system on a modern stack where any qualified .NET engineering team can continue.',
              },
            ],
          },
          services: {
            eyebrow: 'Services',
            title: 'Modernization and data engineering solutions',
            cta: 'Learn more',
            items: [
              {
                code: '01',
                title: 'Technical operational continuity diagnosis',
                description:
                  'Assessment of the current system, real risks ranked by impact, phased modernization roadmap, and effort estimation. Deliverable: a standalone report useful even if we do not move forward together. Fixed scope and price upfront.',
                deliverable: 'Fixed price & scope',
              },
              {
                code: '02',
                title: 'Visual FoxPro / Visual Basic → .NET 8 Migration',
                description:
                  'Migration from DBF files to SQL Server, coexistence architecture between legacy and modern systems, and modular rewrite using Clean Architecture. Frontend in Angular, Blazor, or Next.js depending on the case.',
                deliverable: 'Modular coexistence',
              },
              {
                code: '03',
                title: 'SQL Server: performance, replication & Azure',
                description:
                  'Database diagnostics, on-premise transactional replication to Azure, proactive alert monitoring, and verified disaster recovery plans.',
                deliverable: 'High availability',
              },
              {
                code: '04',
                title: 'ARCA Electronic Invoicing',
                description:
                  'Seamless integration between existing business systems and fiscal webservices, including legacy desktop software currently invoicing through fragile workarounds.',
                deliverable: 'Fiscal compliance',
              },
            ],
          },
          aboutMe: {
            eyebrow: 'Leadership',
            title: 'Who you will work with',
            paragraph1:
              'This service is not outsourced to a rotating agency: it is directly led by Oscar Bringas, Information Systems Engineer (UTN), with over 15 years as a .NET technical lead and 20 years working with SQL Server. For 15 years, he has led the systems department of an agroindustrial cooperative in northern Argentina, where a historical Visual FoxPro system and a production .NET 8 platform coexist daily: producer settlements, grain intake, current accounts, electronic invoicing, and replication to Azure.',
            paragraph2:
              'In other words: the gradual modernization we propose is not a theoretical methodology from a book. It is what we execute every single day on a system supporting an active, real-world enterprise.',
            chips: [
              'UTN Information Systems Engineer',
              '+15 years .NET Tech Lead',
              '20 years SQL Server',
              'Agroindustry & Insurance expertise',
            ],
          },
          closing: {
            title: "Let's start by understanding what you have, not by selling a rewrite.",
            text: 'A technical diagnosis is the most cost-effective way to make a major decision. Tell us about your system and we will quickly respond with a clear scope and fixed price.',
            primaryBtn: 'I want a diagnosis',
            secondaryBtn: 'Chat on WhatsApp',
          },
        }
      : {
          hero: {
            eyebrow: 'MODERNIZACIÓN DE SISTEMAS LEGACY',
            title: 'Tu sistema viejo todavía sostiene la empresa. Ese es el problema.',
            description:
              'Migramos sistemas Visual FoxPro, Visual Basic y Clipper hacia .NET 8 y SQL Server de forma gradual: el sistema actual sigue funcionando mientras el nuevo crece al lado. Sin parar la operación, sin big bang, con vuelta atrás en cada paso.',
            primaryCta: 'Pedir un diagnóstico técnico',
            secondaryCta: 'Ver cómo trabajamos',
          },
          signals: {
            eyebrow: 'Diagnóstico',
            title: 'Señales de que ya es hora',
            intro: 'Si reconocés dos o más de estas, el problema ya no es técnico: es de continuidad del negocio.',
            items: [
              {
                id: 1,
                title: 'Una sola persona entiende el sistema',
                description: 'Si esa persona se va o se enferma, la empresa queda expuesta.',
              },
              {
                id: 2,
                title: 'Cada cambio de ARCA es una urgencia',
                description: 'Facturar depende de parches de último momento.',
              },
              {
                id: 3,
                title: 'Nadie quiere tocarlo',
                description: 'Se acumulan pedidos del negocio porque modificar el sistema da miedo.',
              },
              {
                id: 4,
                title: 'No hay ambiente de pruebas ni respaldo probado',
                description: 'Se prueba en producción y se cruzan los dedos.',
              },
              {
                id: 5,
                title: 'La información vive en archivos DBF o planillas',
                description: 'No en una base de datos que se pueda consultar con agilidad.',
              },
              {
                id: 6,
                title: 'El proveedor original ya no está',
                description: 'O mantiene el sistema sin evolucionarlo ni modernizarlo.',
              },
            ],
          },
          howWeWork: {
            eyebrow: 'Metodología',
            title: 'Cómo trabajamos',
            pillars: [
              {
                number: '01',
                tag: 'Menor riesgo',
                title: 'Gradual, no big bang',
                description:
                  'La reescritura completa de un sistema que funciona es el camino más caro y más riesgoso. Trabajamos por módulos: el sistema legacy y el nuevo conviven, comparten datos, y se van reemplazando las partes de a una, empezando por las de menor riesgo.',
              },
              {
                number: '02',
                tag: 'Relevamiento',
                title: 'Primero entender, después tocar',
                description:
                  'Un sistema de 20 años tiene reglas de negocio que nadie documentó y que la empresa necesita. Antes de escribir código, se releva qué hace el sistema y por qué.',
              },
              {
                number: '03',
                tag: 'Seguridad operativa',
                title: 'Reversible en cada paso',
                description:
                  'Cada etapa se puede dar marcha atrás. Si un módulo nuevo no responde como se esperaba, se vuelve al anterior sin perder datos ni jornadas de trabajo.',
              },
              {
                number: '04',
                tag: 'Autonomía',
                title: 'Documentado y transferible',
                description:
                  'El objetivo no es que dependas de nosotros: es que el sistema quede en un stack donde cualquier equipo .NET pueda seguir.',
              },
            ],
          },
          services: {
            eyebrow: 'Servicios',
            title: 'Soluciones de modernización e ingeniería de datos',
            cta: 'Consultar',
            items: [
              {
                code: '01',
                title: 'Diagnóstico técnico de continuidad operativa',
                description:
                  'Relevamiento del sistema actual, riesgos reales ordenados por impacto, plan de modernización por etapas y estimación de esfuerzo. Entregable: un informe que sirve aunque después no avancemos juntos. Alcance y precio cerrados de antemano.',
                deliverable: 'Alcance y precio cerrado',
              },
              {
                code: '02',
                title: 'Migración Visual FoxPro / Visual Basic → .NET 8',
                description:
                  'Migración de datos DBF a SQL Server, arquitectura de convivencia entre el sistema viejo y el nuevo, y reescritura por módulos con Clean Architecture. Frontend en Angular, Blazor o Next.js según el caso.',
                deliverable: 'Convivencia modular',
              },
              {
                code: '03',
                title: 'SQL Server: performance, replicación y Azure',
                description:
                  'Diagnóstico de bases de datos, replicación transaccional on-premise hacia Azure, monitoreo con alertas y planes de respaldo verificados.',
                deliverable: 'Alta disponibilidad',
              },
              {
                code: '04',
                title: 'Facturación electrónica ARCA',
                description:
                  'Integración de sistemas existentes con los webservices de ARCA, incluyendo sistemas de escritorio antiguos que hoy facturan con soluciones improvisadas.',
                deliverable: 'Cumplimiento normativo',
              },
            ],
          },
          aboutMe: {
            eyebrow: 'Liderazgo técnico',
            title: 'Con quién vas a trabajar',
            paragraph1:
              'Este servicio no lo da una agencia rotativa: lo lleva adelante Oscar Bringas, ingeniero en sistemas de información (UTN), con más de 15 años como líder técnico .NET y 20 trabajando con SQL Server. Hace 15 años está a cargo de los sistemas de una cooperativa agroindustrial del norte argentino, donde conviven a diario un sistema Visual FoxPro histórico y una plataforma .NET 8 en producción: liquidaciones a productores, acopio, cuentas corrientes, facturación electrónica y replicación hacia Azure.',
            paragraph2:
              'Es decir: la modernización gradual que proponemos no es una metodología leída. Es la que ejecutamos todos los días sobre un sistema del que depende una empresa real.',
            chips: [
              'Ing. en Sistemas de Información (UTN)',
              '+15 años Líder Técnico .NET',
              '20 años SQL Server',
              'Experiencia en Agroindustria y Seguros',
            ],
          },
          closing: {
            title: 'Empecemos por entender qué tenés, no por vender una reescritura.',
            text: 'El diagnóstico técnico es la forma más barata de tomar una decisión grande. Contanos qué sistema tenés y en cuánto tiempo respondemos con un alcance y un precio cerrados.',
            primaryBtn: 'Quiero un diagnóstico',
            secondaryBtn: 'Escribir por WhatsApp',
          },
        }
  ));
}
