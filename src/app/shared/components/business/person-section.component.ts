import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-person-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="person-section">
      <div class="container-custom person-section__grid">
        <div class="person-section__portrait" role="img" [attr.aria-label]="photoLabel()">
          <span>OB</span>
          <small>{{ photoLabel() }}</small>
        </div>
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
    .person-section__portrait { aspect-ratio:4/5; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; border-radius:1rem; background:#263d56; color:#fff; overflow:hidden; }
    .person-section__portrait span { font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(5rem,10vw,8rem); line-height:1; color:#88c7f5; }
    .person-section__portrait small { max-width:12rem; color:#c3d5e5; font-size:.75rem; line-height:1.4; text-align:center; }
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
