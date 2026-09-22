import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioCase } from '../../../data/portfolio.data';

@Component({
  selector: 'app-case-highlights',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="case-section">
      <div class="container-custom">
        <div class="case-section__head">
          <h2>{{ title() }}</h2>
          <a routerLink="/portfolio">{{ linkLabel() }}</a>
        </div>
        <div class="case-list">
          @for (item of cases(); track item.id) {
            <article class="case-item">
              <a [routerLink]="['/portfolio', item.slug]" class="case-item__image">
                <img [src]="item.coverImage" [alt]="item.title" width="1600" height="900" loading="lazy" />
              </a>
              <div class="case-item__body">
                <span>{{ item.industry }}</span>
                <h3><a [routerLink]="['/portfolio', item.slug]">{{ item.title }}</a></h3>
                <dl>
                  <div><dt>{{ situationLabel() }}</dt><dd>{{ item.situation }}</dd></div>
                  <div><dt>{{ resultLabel() }}</dt><dd>{{ item.result }}</dd></div>
                </dl>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host{display:block}.case-section{padding-block:clamp(4.5rem,8vw,7.5rem);background:#f4f7f9}.case-section__head{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:3rem}.case-section__head h2{max-width:12ch;color:#1c2a3c;font-size:clamp(2.25rem,4.5vw,4rem);line-height:1}.case-section__head>a{color:#0067b8;font-weight:700;text-decoration:underline;text-underline-offset:.35em}.case-list{display:grid;gap:3rem}.case-item{display:grid;grid-template-columns:minmax(16rem,.85fr) minmax(0,1.15fr);align-items:center;gap:clamp(2rem,6vw,5rem);padding-bottom:3rem;border-bottom:1px solid #c8d3dc}.case-item:nth-child(even){grid-template-columns:minmax(0,1.15fr) minmax(16rem,.85fr)}.case-item:nth-child(even) .case-item__image{order:2}.case-item__image{display:block;overflow:hidden;border-radius:.9rem;background:#dce6ed;box-shadow:0 24px 55px -35px rgba(28,42,60,.65)}.case-item__image img{display:block;width:100%;height:auto;transition:transform 500ms cubic-bezier(.22,1,.36,1)}.case-item__image:hover img{transform:scale(1.025)}.case-item__body>span{color:#0067b8;font-size:.78rem;font-weight:700}.case-item h3{margin-top:.55rem;color:#1c2a3c;font-size:clamp(1.7rem,3vw,2.7rem);line-height:1.05}.case-item h3 a:hover{text-decoration:underline;text-underline-offset:.2em}.case-item dl{display:grid;gap:1rem;margin-top:1.5rem}.case-item dl div{display:grid;grid-template-columns:6rem 1fr;gap:1rem}.case-item dt{color:#1c2a3c;font-size:.76rem;font-weight:800;text-transform:uppercase}.case-item dd{color:#526274;line-height:1.65}@media(max-width:767px){.case-section__head{align-items:flex-start;flex-direction:column}.case-item,.case-item:nth-child(even){grid-template-columns:1fr}.case-item:nth-child(even) .case-item__image{order:0}.case-item dl div{grid-template-columns:1fr;gap:.25rem}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseHighlightsComponent {
  readonly title = input.required<string>();
  readonly linkLabel = input.required<string>();
  readonly situationLabel = input.required<string>();
  readonly resultLabel = input.required<string>();
  readonly cases = input.required<readonly PortfolioCase[]>();
}
