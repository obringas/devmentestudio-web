import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { siteConfig } from '../../config/site.config';
import { getServiceBySlug } from '../../data';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (service(); as srv) {
      <div class="service-detail">
        <header class="service-detail__head">
          <div class="container-custom">
            <a routerLink="/servicios" class="service-detail__back">← {{ copy().back }}</a>
            <h1>{{ srv.title }}</h1>
            <p class="service-detail__lead">{{ srv.fullDescription }}</p>
            <div class="service-detail__actions">
              <a [routerLink]="srv.cta.href" [queryParams]="{ servicio: srv.slug }" class="btn-primary">
                {{ copy().ctaButton }}
              </a>
              <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-outline">
                {{ copy().whatsappCta }}
              </a>
            </div>
          </div>
        </header>

        <section class="service-detail__includes">
          <div class="container-custom">
            <h2>{{ copy().includes }}</h2>
            <div class="service-detail__includes-grid">
              @for (feature of srv.features; track feature) {
                <article class="service-detail__feature">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <p>{{ feature }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section class="service-detail__benefits">
          <div class="container-custom">
            <h2>{{ copy().benefits }}</h2>
            <div class="service-detail__benefits-grid">
              @for (benefit of srv.benefits; track benefit.title; let idx = $index) {
                <article>
                  <span>0{{ idx + 1 }}</span>
                  <h3>{{ benefit.title }}</h3>
                  <p>{{ benefit.description }}</p>
                </article>
              }
            </div>
          </div>
        </section>

        <section class="service-detail__tech">
          <div class="container-custom">
            <h2>{{ copy().technologies }}</h2>
            <div class="service-detail__tech-list">
              @for (tech of srv.technologies; track tech.name) {
                <span>{{ tech.name }}</span>
              }
            </div>
          </div>
        </section>

        <section class="service-detail__close">
          <div class="container-custom service-detail__close-inner">
            <h2>{{ copy().ctaTitle }}</h2>
            <p>{{ srv.cta.text }}</p>
            <div class="service-detail__close-actions">
              <a [routerLink]="srv.cta.href" [queryParams]="{ servicio: srv.slug }" class="btn-primary">
                {{ copy().ctaButton }}
              </a>
              <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-outline">
                {{ copy().whatsappCta }}
              </a>
            </div>
          </div>
        </section>
      </div>
    } @else {
      <div class="flex min-h-screen items-center justify-center px-6">
        <div class="text-center">
          <h1 class="mb-4 text-2xl font-display font-bold text-[#1c2a3c]">{{ copy().notFoundTitle }}</h1>
          <a routerLink="/servicios" class="btn-primary">{{ copy().notFoundButton }}</a>
        </div>
      </div>
    }
  `,
  styles: `
    :host{display:block}.service-detail{background:#fff}.service-detail__head{padding-block:clamp(3rem,6vw,5rem);border-bottom:1px solid #c7d3dd;background:#fff}.service-detail__back{display:inline-block;margin-bottom:1.5rem;color:#0067b8;font-weight:700}.service-detail h1{max-width:15ch;color:#1c2a3c;font-size:clamp(3rem,6vw,5.6rem);letter-spacing:-.035em;line-height:.94}.service-detail__lead{max-width:48rem;margin-top:1.4rem;color:#526274;font-size:clamp(1.05rem,1.8vw,1.22rem);line-height:1.7}.service-detail__actions{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1.75rem}.service-detail__includes{padding-block:clamp(4rem,7vw,6rem);background:#f4f7f9;border-bottom:1px solid #c7d3dd}.service-detail h2{color:#1c2a3c;font-size:clamp(2.1rem,4vw,3.4rem);line-height:1}.service-detail__includes-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:2rem}.service-detail__feature{display:flex;align-items:flex-start;gap:.75rem;padding:1.4rem;background:#fff;border:1px solid #c7d3dd;border-radius:.9rem}.service-detail__feature svg{width:1.25rem;height:1.25rem;flex-shrink:0;margin-top:.15rem;color:#00965f}.service-detail__feature p{color:#1c2a3c;font-weight:600;line-height:1.55}.service-detail__benefits{padding-block:clamp(4rem,7vw,6rem);background:#fff;border-bottom:1px solid #c7d3dd}.service-detail__benefits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;margin-top:2.2rem}.service-detail__benefits-grid article{padding-top:1.35rem;border-top:2px solid #1c2a3c}.service-detail__benefits-grid span{display:block;margin-bottom:.6rem;color:#0067b8;font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:700;line-height:1}.service-detail__benefits-grid h3{color:#1c2a3c;font-size:1.5rem;line-height:1.1}.service-detail__benefits-grid p{margin-top:.65rem;color:#526274;line-height:1.68}.service-detail__tech{padding-block:clamp(3.5rem,6vw,5rem);background:#f4f7f9}.service-detail__tech-list{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.6rem}.service-detail__tech-list span{padding:.55rem 1.1rem;background:#fff;border:1px solid #c7d3dd;border-radius:9999px;color:#1c2a3c;font-size:.9rem;font-weight:700}.service-detail__close{padding-block:clamp(4.5rem,9vw,7.5rem);background:#1c2a3c;text-align:center}.service-detail__close-inner{max-width:54rem}.service-detail__close h2{color:#fff;font-size:clamp(2.3rem,4.8vw,4.3rem);line-height:.98}.service-detail__close p{max-width:44rem;margin:1.3rem auto 0;color:#d7e2ec;font-size:1.1rem;line-height:1.7}.service-detail__close-actions{display:flex;justify-content:center;flex-wrap:wrap;gap:.8rem;margin-top:2rem}.service-detail__close-actions .btn-outline{border-color:#7392ad;color:#fff}.service-detail__close-actions .btn-outline:hover{background:#fff;color:#1c2a3c}@media(max-width:860px){.service-detail__includes-grid,.service-detail__benefits-grid{grid-template-columns:1fr}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly whatsappUrl = siteConfig.contact.whatsappUrl;

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') || '')),
    { initialValue: '' },
  );

  readonly service = computed(() => {
    const slug = this.slug();
    return slug ? getServiceBySlug(slug, this.language()) : undefined;
  });

  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          back: 'Back to services',
          includes: 'What is included?',
          benefits: 'Benefits',
          technologies: 'Technologies',
          ctaTitle: 'Ready to get started?',
          ctaButton: 'Request a quote',
          whatsappCta: 'Talk on WhatsApp',
          notFoundTitle: 'Service not found',
          notFoundButton: 'View services',
        }
      : {
          back: 'Volver a servicios',
          includes: '¿Qué incluye?',
          benefits: 'Beneficios',
          technologies: 'Tecnologías',
          ctaTitle: '¿Listo para avanzar con este servicio?',
          ctaButton: 'Solicitar presupuesto',
          whatsappCta: 'Hablar por WhatsApp',
          notFoundTitle: 'Servicio no encontrado',
          notFoundButton: 'Ver servicios',
        }
  ));
}
