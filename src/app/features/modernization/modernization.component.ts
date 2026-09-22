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
  selector: 'app-modernization',
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
    <section class="modernization-hero">
      <div class="container-custom modernization-hero__grid">
        <div>
          <p class="modernization-hero__label">{{ copy().modernizationHero.label }}</p>
          <h1>{{ copy().modernizationHero.title }}</h1>
          <p class="modernization-hero__description">{{ copy().modernizationHero.description }}</p>
          <div class="modernization-hero__actions">
            <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">
              {{ copy().modernizationHero.primaryCta }}
            </a>
            <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-outline">
              {{ copy().modernizationHero.secondaryCta }}
            </a>
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
    </section>

    <app-content-grid-section
      [title]="copy().signals.title"
      [intro]="copy().signals.intro"
      [items]="allSignals()"
      [closingText]="copy().signals.close"
      closingLink="/modernizacion"
      closingFragment="como-trabajamos"
      [closingLinkLabel]="copy().signals.closeLink"
    />

    <app-content-grid-section
      [title]="copy().outcomes.title"
      [items]="copy().outcomes.items"
      [tinted]="true"
    />

    <app-content-grid-section
      sectionId="como-trabajamos"
      [title]="copy().process.title"
      [intro]="copy().process.subtitle"
      [items]="copy().process.items"
      [numbered]="true"
    />

    <section class="modernization-services">
      <div class="container-custom">
        <div class="modernization-services__head">
          <h2>{{ copy().modernizationServices.title }}</h2>
          <p>{{ copy().modernizationServices.intro }}</p>
        </div>
        <div class="modernization-services__list">
          @for (service of copy().modernizationServices.items; track service.slug; let index = $index) {
            <article>
              <span>{{ index + 1 }}</span>
              <div><h3>{{ service.title }}</h3><p>{{ service.description }}</p></div>
              <a routerLink="/contacto" [queryParams]="{ servicio: service.slug }">{{ copy().services.cta }}</a>
            </article>
          }
        </div>
      </div>
    </section>

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
      [desktopExpanded]="true"
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
    .modernization-hero{padding-top:clamp(2rem,4vw,4rem)!important;padding-bottom:clamp(2.5rem,5vw,4.5rem)!important}
    .modernization-hero h1{margin-top:.85rem!important;font-size:clamp(2.9rem,4.25vw,4.25rem)!important}
    .modernization-hero__description{margin-top:1rem!important;font-size:clamp(1rem,1.4vw,1.08rem)!important;line-height:1.58!important}
    .modernization-hero__actions{margin-top:1.15rem!important}
    :host{display:block}.modernization-hero{padding-block:clamp(4rem,8vw,7rem);background:#fff}.modernization-hero__grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(23rem,.92fr);align-items:center;gap:clamp(3rem,7vw,7rem)}.modernization-hero__label{color:#0067b8;font-size:.76rem;font-weight:800;letter-spacing:.13em;line-height:1.5}.modernization-hero h1{max-width:14ch;margin-top:1.2rem;color:#1c2a3c;font-size:clamp(3rem,5.6vw,5.6rem);letter-spacing:-.035em;line-height:.94}.modernization-hero__description{max-width:46rem;margin-top:1.6rem;color:#526274;font-size:clamp(1.05rem,1.8vw,1.2rem);line-height:1.75}.modernization-hero__actions{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:2rem}.modernization-services{padding-block:clamp(4.5rem,8vw,7rem);background:#1c2a3c}.modernization-services__head{display:grid;grid-template-columns:.8fr 1.2fr;gap:2rem;align-items:end;margin-bottom:3rem}.modernization-services h2{color:#fff;font-size:clamp(2.25rem,4.5vw,4rem);line-height:1}.modernization-services__head p{max-width:42rem;color:#cbd9e5;font-size:1.1rem}.modernization-services__list{border-top:1px solid #52708a}.modernization-services article{display:grid;grid-template-columns:3rem minmax(0,1fr) auto;gap:1.5rem;align-items:start;padding:1.75rem 0;border-bottom:1px solid #52708a}.modernization-services article>span{color:#8bd1ff;font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;line-height:1}.modernization-services h3{color:#fff;font-size:1.5rem}.modernization-services article p{max-width:52rem;margin-top:.65rem;color:#cbd9e5;line-height:1.7}.modernization-services article a{color:#8bd1ff;font-size:.84rem;font-weight:700;text-decoration:underline;text-underline-offset:.3em}@media(max-width:900px){.modernization-hero__grid,.modernization-services__head{grid-template-columns:1fr}}@media(max-width:600px){.modernization-services article{grid-template-columns:2rem 1fr}.modernization-services article a{grid-column:2}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModernizationComponent {
  private readonly locale = inject(LocaleService);

  readonly copy = computed(() => getBusinessContent(this.locale.language()));
  readonly allSignals = computed(() => [...this.copy().signals.items, ...this.copy().signals.extraItems]);
  readonly cases = computed(() => getPortfolioCases(this.locale.language()));
  readonly contact = siteConfig.contact;
  readonly whatsappUrl = siteConfig.contact.whatsappUrl;
  readonly phoneUrl = `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, '')}`;
  readonly diagram = computed(() => this.locale.language() === 'en'
    ? {
        ariaLabel: 'Diagram showing the current system operating while a new system grows beside it, one module at a time.',
        currentLabel: 'Current system', currentState: 'Protects daily work', newLabel: 'New system',
        newState: 'Takes over in stages', bridgeLabel: 'Verified modules', operationLabel: 'Daily operations continue',
      }
    : {
        ariaLabel: 'Diagrama de convivencia: el sistema actual sostiene la operación mientras el nuevo lo reemplaza por módulos verificados.',
        currentLabel: 'Sistema actual', currentState: 'Sostiene la operación', newLabel: 'Sistema nuevo',
        newState: 'Reemplaza por etapas', bridgeLabel: 'Módulos verificados', operationLabel: 'La empresa sigue operando',
      });
}
