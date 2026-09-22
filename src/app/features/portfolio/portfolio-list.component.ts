import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';
import { getPortfolioCases } from '../../data/portfolio.data';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="portfolio-head">
      <div class="container-custom">
        <h1>{{ copy().title }}</h1>
        <p>{{ copy().description }}</p>
      </div>
    </header>
    <main class="portfolio-cases">
      <div class="container-custom">
        @for (item of cases(); track item.id) {
          <article class="portfolio-case">
            <a [routerLink]="['/portfolio', item.slug]" class="portfolio-case__image">
              <img [src]="item.coverImage" [alt]="item.title" width="1600" height="900" loading="lazy" />
            </a>
            <div>
              <span>{{ item.industry }}</span>
              <h2><a [routerLink]="['/portfolio', item.slug]">{{ item.title }}</a></h2>
              <dl>
                <div><dt>{{ copy().situation }}</dt><dd>{{ item.situation }}</dd></div>
                <div><dt>{{ copy().work }}</dt><dd>{{ item.work }}</dd></div>
                <div><dt>{{ copy().result }}</dt><dd>{{ item.result }}</dd></div>
              </dl>
              <div class="portfolio-case__tech">
                <small>{{ copy().technologies }}</small>
                <p>{{ item.technologies.join(' · ') }}</p>
              </div>
            </div>
          </article>
        }
      </div>
    </main>
    <section class="portfolio-close">
      <div class="container-custom">
        <h2>{{ copy().closingTitle }}</h2>
        <p>{{ copy().closingText }}</p>
        <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">{{ copy().closingCta }}</a>
      </div>
    </section>
  `,
  styles: `
    :host{display:block}.portfolio-head{padding-block:clamp(3rem,6vw,5rem);background:#fff}.portfolio-head h1{max-width:13ch;color:#1c2a3c;font-size:clamp(3.2rem,7vw,6rem);letter-spacing:-.035em;line-height:.92}.portfolio-head p{max-width:48rem;margin-top:1.5rem;color:#526274;font-size:clamp(1.05rem,2vw,1.25rem);line-height:1.7}.portfolio-cases{padding-bottom:clamp(5rem,9vw,8rem);background:#fff}.portfolio-case{display:grid;grid-template-columns:minmax(18rem,.88fr) minmax(0,1.12fr);gap:clamp(2rem,7vw,6rem);align-items:center;padding-block:clamp(3rem,6vw,5rem);border-top:1px solid #c7d3dd}.portfolio-case:nth-child(even){grid-template-columns:minmax(0,1.12fr) minmax(18rem,.88fr)}.portfolio-case:nth-child(even) .portfolio-case__image{order:2}.portfolio-case__image{overflow:hidden;border-radius:1rem;box-shadow:0 28px 60px -38px rgba(28,42,60,.75)}.portfolio-case__image img{display:block;width:100%;height:auto;transition:transform 500ms cubic-bezier(.22,1,.36,1)}.portfolio-case__image:hover img{transform:scale(1.025)}.portfolio-case>div>span{color:#0067b8;font-size:.78rem;font-weight:800}.portfolio-case h2{margin-top:.55rem;color:#1c2a3c;font-size:clamp(2rem,4vw,3.3rem);line-height:1}.portfolio-case h2 a:hover{text-decoration:underline;text-underline-offset:.18em}.portfolio-case dl{display:grid;gap:1.2rem;margin-top:1.8rem}.portfolio-case dl div{display:grid;grid-template-columns:7rem 1fr;gap:1rem}.portfolio-case dt,.portfolio-case__tech small{color:#1c2a3c;font-size:.72rem;font-weight:800;text-transform:uppercase}.portfolio-case dd{color:#526274;line-height:1.65}.portfolio-case__tech{margin-top:1.7rem;padding-top:1rem;border-top:1px solid #d4dde4}.portfolio-case__tech p{margin-top:.35rem;color:#687787;font-size:.82rem}.portfolio-close{padding-block:clamp(5rem,9vw,8rem);background:#1c2a3c;text-align:center}.portfolio-close h2{max-width:16ch;margin:auto;color:#fff;font-size:clamp(2.4rem,5vw,4.5rem);line-height:.98}.portfolio-close p{max-width:44rem;margin:1.4rem auto 2rem;color:#d4e0e9;font-size:1.1rem}@media(max-width:800px){.portfolio-case,.portfolio-case:nth-child(even){grid-template-columns:1fr}.portfolio-case:nth-child(even) .portfolio-case__image{order:0}.portfolio-case dl div{grid-template-columns:1fr;gap:.3rem}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioListComponent {
  private readonly locale = inject(LocaleService);
  readonly cases = computed(() => getPortfolioCases(this.locale.language()));
  readonly copy = computed(() => this.locale.language() === 'en'
    ? {
        title: 'Real work, running in production',
        description: 'Three anonymized cases where the business problem came first and technology served continuity.',
        situation: 'Situation', work: 'What we did', result: 'What changed', technologies: 'Technologies',
        closingTitle: 'Do you have a system that needs to evolve?',
        closingText: 'Tell us what your company depends on today and we will help you identify the safest first step.',
        closingCta: 'Assess my current system',
      }
    : {
        title: 'Trabajo real, en producción',
        description: 'Tres casos anonimizados donde el problema del negocio estuvo primero y la tecnología sirvió para cuidar la continuidad.',
        situation: 'Situación', work: 'Qué hicimos', result: 'Qué cambió', technologies: 'Tecnologías',
        closingTitle: '¿Tenés un sistema que necesita evolucionar?',
        closingText: 'Contanos de qué depende hoy tu empresa y te ayudamos a identificar el primer paso más seguro.',
        closingCta: 'Quiero saber cómo está mi sistema',
      });
}
