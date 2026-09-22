import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteConfig } from '../../config/site.config';
import { LocaleService } from '../../core/services/locale.service';
import { getBusinessContent } from '../../data/business-content.data';
import { getPortfolioCases } from '../../data/portfolio.data';
import { CaseHighlightsComponent } from '../../shared/components/business/case-highlights.component';
import { ClosingSectionComponent } from '../../shared/components/business/closing-section.component';
import { ContentGridSectionComponent } from '../../shared/components/business/content-grid-section.component';
import { ContinuityDiagramComponent } from '../../shared/components/business/continuity-diagram.component';
import { FaqSectionComponent } from '../../shared/components/business/faq-section.component';
import { PersonSectionComponent } from '../../shared/components/business/person-section.component';
import { TechnicalDetailsComponent } from '../../shared/components/business/technical-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ContinuityDiagramComponent,
    ContentGridSectionComponent,
    CaseHighlightsComponent,
    PersonSectionComponent,
    TechnicalDetailsComponent,
    FaqSectionComponent,
    ClosingSectionComponent,
  ],
  template: `
    <section class="home-hero">
      <div class="container-custom home-hero__grid">
        <div class="home-hero__copy">
          <p class="home-hero__label">{{ copy().homeHero.label }}</p>
          <h1>{{ copy().homeHero.title }}</h1>
          <p class="home-hero__description">{{ copy().homeHero.description }}</p>
          <div class="home-hero__actions">
            <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">
              {{ copy().homeHero.primaryCta }}
            </a>
            <a href="#como-trabajamos" class="btn-outline">{{ copy().homeHero.secondaryCta }}</a>
          </div>
        </div>

        <app-continuity-diagram
          [ariaLabel]="diagram().ariaLabel"
          [currentLabel]="diagram().currentLabel"
          [currentState]="diagram().currentState"
          [newLabel]="diagram().newLabel"
          [newState]="diagram().newState"
          [bridgeLabel]="diagram().bridgeLabel"
          [operationLabel]="diagram().operationLabel"
        />
      </div>

      <div class="container-custom trust-strip" aria-label="Datos de confianza">
        @for (item of copy().trust; track item) { <span>{{ item }}</span> }
      </div>
    </section>

    <app-content-grid-section
      [title]="copy().signals.title"
      [intro]="copy().signals.intro"
      [items]="copy().signals.items"
      [closingText]="copy().signals.close"
      closingLink="/modernizacion"
      [closingLinkLabel]="copy().signals.closeLink"
    />

    <app-content-grid-section
      [title]="copy().outcomes.title"
      [items]="copy().outcomes.items"
      [tinted]="true"
    />

    <section class="services-section">
      <div class="container-custom">
        <div class="services-section__heading">
          <h2>{{ copy().services.title }}</h2>
          <p>{{ copy().services.intro }}</p>
        </div>
        <div class="services-list">
          @for (service of copy().services.items; track service.slug) {
            <article class="service-row" [class.service-row--specialty]="service.specialty">
              <div>
                @if (service.specialty) { <span>{{ copy().services.specialtyLabel }}</span> }
                <h3>{{ service.title }}</h3>
              </div>
              <p>{{ service.description }}</p>
              <div class="service-row__actions">
                @if (service.specialty) {
                  <a routerLink="/modernizacion">{{ copy().services.detailsCta }}</a>
                }
                <a routerLink="/contacto" [queryParams]="{ servicio: service.slug }">{{ copy().services.cta }}</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <app-content-grid-section
      sectionId="como-trabajamos"
      [title]="copy().process.title"
      [intro]="copy().process.subtitle"
      [items]="copy().process.items"
      [numbered]="true"
    />

    <app-case-highlights
      [title]="copy().portfolio.title"
      [linkLabel]="copy().portfolio.link"
      [situationLabel]="copy().portfolio.situationLabel"
      [resultLabel]="copy().portfolio.resultLabel"
      [cases]="cases()"
    />

    <app-person-section
      [title]="copy().person.title"
      [body]="copy().person.body"
      [linkLabel]="copy().person.link"
      [photoLabel]="copy().person.photoPending"
    />

    <app-technical-details
      [title]="copy().technical.title"
      [intro]="copy().technical.intro"
      [groups]="copy().technical.groups"
    />

    <app-faq-section [title]="copy().faq.title" [items]="copy().faq.items" />

    <app-closing-section
      [title]="copy().closing.title"
      [text]="copy().closing.text"
      [primaryCta]="copy().closing.primaryCta"
      [whatsappCta]="copy().closing.whatsappCta"
      [whatsappUrl]="whatsappUrl"
      [email]="contact.email"
      [phone]="contact.phone"
      [phoneUrl]="phoneUrl"
    />
  `,
  styles: `
    .home-hero{padding-top:clamp(3rem,6vw,5.5rem)!important}
    .home-hero h1{margin-top:1rem!important;font-size:clamp(3.1rem,5.35vw,5.2rem)!important}
    .home-hero__description{margin-top:1.3rem!important;font-size:clamp(1.03rem,1.6vw,1.15rem)!important;line-height:1.65!important}
    .home-hero__actions{margin-top:1.5rem!important}
    :host{display:block}.home-hero{padding:clamp(4rem,8vw,7rem) 0 0;background:#fff}.home-hero__grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(24rem,.95fr);align-items:center;gap:clamp(3rem,7vw,7rem)}.home-hero__label{max-width:40rem;color:#0067b8;font-size:.76rem;font-weight:800;letter-spacing:.13em;line-height:1.5}.home-hero h1{max-width:12ch;margin-top:1.25rem;color:#1c2a3c;font-size:clamp(3.2rem,6vw,6rem);letter-spacing:-.035em;line-height:.92}.home-hero__description{max-width:42rem;margin-top:1.75rem;color:#526274;font-size:clamp(1.05rem,1.8vw,1.22rem);line-height:1.75}.home-hero__actions{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:2rem}.trust-strip{display:grid;grid-template-columns:repeat(4,1fr);margin-top:clamp(3rem,7vw,6rem);border-top:1px solid #c7d3dd;border-bottom:1px solid #c7d3dd}.trust-strip span{padding:1.35rem 1rem;color:#1c2a3c;font-size:.84rem;font-weight:700;text-align:center;border-right:1px solid #c7d3dd}.trust-strip span:last-child{border-right:0}.services-section{padding-block:clamp(4.5rem,8vw,7.5rem);background:#1c2a3c}.services-section__heading{display:grid;grid-template-columns:.8fr 1.2fr;gap:2rem;align-items:end;margin-bottom:2.5rem}.services-section h2{color:#fff;font-size:clamp(2.3rem,4.5vw,4rem);line-height:1}.services-section__heading p{max-width:42rem;color:#cbd9e5;font-size:1.12rem}.services-list{border-top:1px solid #52708a}.service-row{display:grid;grid-template-columns:minmax(12rem,.75fr) minmax(0,1.25fr) auto;gap:clamp(1.5rem,4vw,4rem);align-items:center;padding:1.8rem 0;border-bottom:1px solid #52708a}.service-row--specialty{padding-inline:1.2rem;background:#223850}.service-row span{display:inline-block;margin-bottom:.5rem;color:#8bd1ff;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.12em}.service-row h3{color:#fff;font-size:clamp(1.35rem,2.2vw,2rem);line-height:1.1}.service-row>p{color:#cbd9e5;line-height:1.7}.service-row__actions{display:flex;flex-direction:column;align-items:flex-end;gap:.55rem}.service-row a{color:#8bd1ff;font-size:.84rem;font-weight:700;text-decoration:underline;text-underline-offset:.3em}@media(max-width:900px){.home-hero__grid{grid-template-columns:1fr}.home-hero h1{font-size:clamp(3rem,10vw,5rem)}.trust-strip{grid-template-columns:repeat(2,1fr)}.trust-strip span:nth-child(2){border-right:0}.trust-strip span:nth-child(-n+2){border-bottom:1px solid #c7d3dd}.services-section__heading,.service-row{grid-template-columns:1fr}.service-row__actions{align-items:flex-start}}@media(max-width:520px){.trust-strip{grid-template-columns:1fr}.trust-strip span{border-right:0;border-bottom:1px solid #c7d3dd}.trust-strip span:last-child{border-bottom:0}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly locale = inject(LocaleService);

  readonly copy = computed(() => getBusinessContent(this.locale.language()));
  readonly cases = computed(() => getPortfolioCases(this.locale.language()));
  readonly contact = siteConfig.contact;
  readonly whatsappUrl = siteConfig.contact.whatsappUrl;
  readonly phoneUrl = `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, '')}`;
  readonly diagram = computed(() => this.locale.language() === 'en'
    ? {
        ariaLabel: 'Diagram showing the current system operating while a new system grows beside it, one module at a time.',
        currentLabel: 'Your current system', currentState: 'Keeps operating', newLabel: 'The new system',
        newState: 'Grows alongside it', bridgeLabel: 'Module by module', operationLabel: 'Operations continue',
      }
    : {
        ariaLabel: 'Diagrama de convivencia: el sistema actual sigue funcionando mientras el nuevo crece a su lado, módulo por módulo.',
        currentLabel: 'Tu sistema actual', currentState: 'Sigue funcionando', newLabel: 'El nuevo',
        newState: 'Crece al lado', bridgeLabel: 'Módulo por módulo', operationLabel: 'La operación continúa',
      });
}
