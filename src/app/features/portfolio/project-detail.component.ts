import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';
import { getPortfolioCaseBySlug } from '../../data/portfolio.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="project-detail">
      <div class="container-custom">
        <a routerLink="/portfolio" class="project-detail__back">← {{ copy().back }}</a>
        @if (project(); as item) {
          <article>
            <header>
              <span>{{ item.industry }}</span>
              <h1>{{ item.title }}</h1>
            </header>
            <img [src]="item.coverImage" [alt]="item.title" width="1600" height="900" />
            <div class="project-detail__story">
              <section><h2>{{ copy().situation }}</h2><p>{{ item.situation }}</p></section>
              <section><h2>{{ copy().work }}</h2><p>{{ item.work }}</p></section>
              <section class="project-detail__result"><h2>{{ copy().result }}</h2><p>{{ item.result }}</p></section>
            </div>
            <footer>
              <small>{{ copy().technologies }}</small>
              <p>{{ item.technologies.join(' · ') }}</p>
            </footer>
          </article>
          <aside>
            <h2>{{ copy().ctaTitle }}</h2>
            <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">{{ copy().cta }}</a>
          </aside>
        } @else {
          <h1>{{ copy().notFound }}</h1>
        }
      </div>
    </main>
  `,
  styles: `
    :host{display:block}.project-detail{padding-block:clamp(3rem,7vw,6rem);background:#fff}.project-detail__back{display:inline-block;margin-bottom:2rem;color:#0067b8;font-weight:700}.project-detail header>span{color:#0067b8;font-size:.78rem;font-weight:800}.project-detail h1{max-width:15ch;margin-top:.5rem;color:#1c2a3c;font-size:clamp(3rem,6.5vw,5.8rem);letter-spacing:-.035em;line-height:.94}.project-detail article>img{display:block;width:100%;margin-top:2.5rem;border-radius:1rem}.project-detail__story{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(1.5rem,4vw,3.5rem);margin-top:3rem}.project-detail__story section{padding-top:1.2rem;border-top:1px solid #b9c6d1}.project-detail__story h2{color:#1c2a3c;font-size:1.2rem}.project-detail__story p{margin-top:.75rem;color:#526274;line-height:1.75}.project-detail__result{background:#e8f4fc;padding:1.2rem}.project-detail footer{margin-top:2.5rem;padding-top:1.2rem;border-top:1px solid #b9c6d1}.project-detail footer small{color:#1c2a3c;font-weight:800;text-transform:uppercase}.project-detail footer p{margin-top:.35rem;color:#687787}.project-detail aside{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;margin-top:5rem;padding:2rem;background:#1c2a3c;border-radius:1rem}.project-detail aside h2{max-width:22ch;color:#fff;font-size:clamp(1.7rem,3vw,2.5rem)}@media(max-width:767px){.project-detail__story{grid-template-columns:1fr}.project-detail aside{align-items:flex-start;flex-direction:column}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly locale = inject(LocaleService);
  private readonly slug = computed(() => this.route.snapshot.paramMap.get('slug') ?? '');
  readonly project = computed(() => getPortfolioCaseBySlug(this.slug(), this.locale.language()));
  readonly copy = computed(() => this.locale.language() === 'en'
    ? { back: 'Back to portfolio', situation: 'Situation', work: 'What we did', result: 'What changed', technologies: 'Technologies', ctaTitle: 'Is your company facing something similar?', cta: 'Assess my current system', notFound: 'Project not found' }
    : { back: 'Volver al portfolio', situation: 'Situación', work: 'Qué hicimos', result: 'Qué cambió para la empresa', technologies: 'Tecnologías', ctaTitle: '¿Tu empresa enfrenta algo parecido?', cta: 'Quiero saber cómo está mi sistema', notFound: 'Proyecto no encontrado' });
}
