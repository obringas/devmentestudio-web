import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteConfig } from '../../config/site.config';
import { getServices } from '../../data';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="services-page">
      <header class="services-head">
        <div class="container-custom">
          <p class="services-head__eyebrow">{{ copy().eyebrow }}</p>
          <h1>{{ copy().title }}</h1>
          <p class="services-head__lead">{{ copy().description }}</p>
        </div>
      </header>

      <main class="services-catalog">
        <div class="container-custom">
          @for (service of services(); track service.id; let idx = $index) {
            <article class="service-item">
              <div class="service-item__main">
                <span class="service-item__num">0{{ idx + 1 }}</span>
                <h2>
                  <a [routerLink]="service.slug === 'modernizacion' ? '/modernizacion' : ['/servicios', service.slug]">
                    {{ service.title }}
                  </a>
                </h2>
                <p class="service-item__desc">{{ service.fullDescription }}</p>

                <div class="service-item__tech">
                  @for (tech of service.technologies; track tech.name) {
                    <span>{{ tech.name }}</span>
                  }
                </div>

                <div class="service-item__links">
                  <a [routerLink]="service.slug === 'modernizacion' ? '/modernizacion' : ['/servicios', service.slug]" class="service-item__primary-link">
                    {{ copy().viewDetails }} →
                  </a>
                  <a routerLink="/contacto" [queryParams]="{ servicio: service.slug }" class="service-item__secondary-link">
                    {{ copy().quoteCta }}
                  </a>
                </div>
              </div>

              <div class="service-item__includes">
                <h3>{{ copy().includes }}</h3>
                <ul>
                  @for (feature of service.features; track feature) {
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>{{ feature }}</span>
                    </li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>
      </main>

      <section class="services-close">
        <div class="container-custom services-close__inner">
          <h2>{{ copy().ctaTitle }}</h2>
          <p>{{ copy().ctaDescription }}</p>
          <div class="services-close__actions">
            <a routerLink="/contacto" class="btn-primary">{{ copy().ctaButton }}</a>
            <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-outline">{{ copy().whatsappCta }}</a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: `
    :host{display:block}.services-page{background:#fff}.services-head{padding-block:clamp(3rem,6vw,5rem);border-bottom:1px solid #c7d3dd;background:#fff}.services-head__eyebrow{color:#0067b8;font-size:.76rem;font-weight:800;text-transform:uppercase;letter-spacing:.13em}.services-head h1{max-width:15ch;margin-top:.65rem;color:#1c2a3c;font-size:clamp(3rem,6vw,5.6rem);letter-spacing:-.035em;line-height:.94}.services-head__lead{max-width:48rem;margin-top:1.4rem;color:#526274;font-size:clamp(1.05rem,1.8vw,1.22rem);line-height:1.7}.services-catalog{padding-bottom:clamp(4rem,8vw,7rem);background:#fff}.service-item{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(18rem,.85fr);gap:clamp(2rem,5vw,4.5rem);align-items:start;padding-block:clamp(2.75rem,5vw,4.25rem);border-bottom:1px solid #c7d3dd}.service-item__num{display:inline-block;color:#0067b8;font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:700;line-height:1}.service-item h2{margin-top:.45rem;color:#1c2a3c;font-size:clamp(2rem,3.6vw,3.1rem);line-height:1.02}.service-item h2 a:hover{color:#0067b8;text-decoration:underline;text-underline-offset:.18em}.service-item__desc{margin-top:1.1rem;color:#526274;font-size:1.04rem;line-height:1.72}.service-item__tech{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.35rem}.service-item__tech span{padding:.3rem .75rem;border:1px solid #c7d3dd;border-radius:9999px;background:#f4f7f9;color:#1c2a3c;font-size:.78rem;font-weight:700}.service-item__links{display:flex;flex-wrap:wrap;gap:1.25rem;align-items:center;margin-top:1.6rem}.service-item__primary-link{color:#0067b8;font-weight:800;text-decoration:underline;text-underline-offset:.28em}.service-item__secondary-link{color:#1c2a3c;font-size:.9rem;font-weight:700;text-decoration:underline;text-underline-offset:.28em}.service-item__includes{padding:1.6rem 1.75rem;background:#f4f7f9;border:1px solid #c7d3dd;border-radius:1rem}.service-item__includes h3{color:#1c2a3c;font-size:1.15rem;font-weight:700}.service-item__includes ul{display:grid;gap:.75rem;margin-top:1rem}.service-item__includes li{display:flex;align-items:flex-start;gap:.65rem;color:#526274;font-size:.95rem;line-height:1.55}.service-item__includes svg{width:1.15rem;height:1.15rem;flex-shrink:0;margin-top:.15rem;color:#00965f}.services-close{padding-block:clamp(4.5rem,9vw,7.5rem);background:#1c2a3c;text-align:center}.services-close__inner{max-width:56rem}.services-close h2{color:#fff;font-size:clamp(2.3rem,4.8vw,4.3rem);line-height:.98}.services-close p{max-width:44rem;margin:1.35rem auto 0;color:#d7e2ec;font-size:1.1rem;line-height:1.7}.services-close__actions{display:flex;justify-content:center;flex-wrap:wrap;gap:.8rem;margin-top:2rem}.services-close__actions .btn-outline{border-color:#7392ad;color:#fff}.services-close__actions .btn-outline:hover{background:#fff;color:#1c2a3c}@media(max-width:860px){.service-item{grid-template-columns:1fr}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly whatsappUrl = siteConfig.contact.whatsappUrl;
  readonly services = computed(() => getServices(this.language()));
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'Our Services',
          title: 'Software built around how your business actually works',
          description:
            'We modernize management systems, replace unmanageable spreadsheets and build the digital tools your company needs to keep moving forward.',
          viewDetails: 'View service details',
          quoteCta: 'Consult about this service',
          includes: 'What it includes',
          ctaTitle: 'Need something tailored to your operation?',
          ctaDescription: 'Tell us about your project or current spreadsheet and we will shape the right solution for your business.',
          ctaButton: 'Contact us',
          whatsappCta: 'Talk on WhatsApp',
        }
      : {
          eyebrow: 'Nuestros Servicios',
          title: 'Software pensado desde la operación de tu empresa',
          description:
            'Pasamos planillas críticas a sistemas web, modernizamos sistemas de gestión y creamos sitios comerciales para empresas de todos los tamaños.',
          viewDetails: 'Ver detalles del servicio',
          quoteCta: 'Consultar por este servicio',
          includes: 'Qué incluye',
          ctaTitle: '¿No sabés cuál es el mejor primer paso?',
          ctaDescription: 'Contanos cómo trabajás hoy y armamos una propuesta por etapas adaptada a tu empresa.',
          ctaButton: 'Contactanos',
          whatsappCta: 'Hablar por WhatsApp',
        }
  ));
}
