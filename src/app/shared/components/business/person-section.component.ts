import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-person-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="person-section">
      <div class="container-custom person-section__grid">
        <figure class="person-section__portrait">
          <img src="/images/oscar-bringas.jpg" [alt]="photoLabel()" width="640" height="800" loading="lazy" />
          <figcaption>{{ photoLabel() }}</figcaption>
        </figure>
        <div>
          <h2>{{ title() }}</h2>
          <p>{{ body() }}</p>
          <a routerLink="/nosotros">{{ linkLabel() }}</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display:block; }
    .person-section { padding-block: clamp(4.5rem, 9vw, 8rem); background:#1c2a3c; color:#fff; }
    .person-section__grid { display:grid; grid-template-columns:minmax(15rem,.75fr) minmax(0,1.5fr); align-items:center; gap:clamp(2.5rem,7vw,7rem); }
    .person-section__portrait { margin:0; border-radius:1rem; background:#263d56; border:1px solid #3c5673; overflow:hidden; box-shadow:0 24px 55px -35px rgba(0,0,0,.6); }
    .person-section__portrait img { display:block; width:100%; height:auto; aspect-ratio:4/5; object-fit:cover; }
    .person-section__portrait figcaption { padding:.85rem 1rem; color:#d7e2ec; font-size:.78rem; font-weight:600; text-align:center; border-top:1px solid #3c5673; }
    h2 { max-width:16ch; color:#fff; font-size:clamp(2.3rem,5vw,4.5rem); line-height:.98; }
    p { max-width:66ch; margin-top:1.75rem; color:#d7e2ec; font-size:clamp(1rem,1.7vw,1.15rem); line-height:1.85; }
    a { display:inline-block; margin-top:2rem; color:#8bcdfb; font-weight:700; text-decoration:underline; text-underline-offset:.35em; }
    @media(max-width:767px){ .person-section__grid{grid-template-columns:1fr;} .person-section__portrait{max-width:22rem;} }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonSectionComponent {
  readonly title = input.required<string>();
  readonly body = input.required<string>();
  readonly linkLabel = input.required<string>();
  readonly photoLabel = input.required<string>();
}
