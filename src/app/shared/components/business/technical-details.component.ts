import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TechnicalGroup } from '../../../data/business-content.data';

@Component({
  selector: 'app-technical-details',
  standalone: true,
  template: `
    <section class="technical-section">
      <div class="container-custom technical-section__grid">
        <div>
          <h2>{{ title() }}</h2>
          <p>{{ intro() }}</p>
        </div>
        <div class="technical-section__details">
          @for (group of groups(); track group.title; let first = $first) {
            <details [open]="desktopExpanded() && first">
              <summary>
                <span>{{ group.title }}</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <p>{{ group.description }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host{display:block}.technical-section{padding-block:clamp(4.5rem,8vw,7rem);background:#eaf3f9}.technical-section__grid{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(2.5rem,8vw,7rem)}h2{max-width:10ch;color:#1c2a3c;font-size:clamp(2.25rem,4.5vw,4rem);line-height:1}h2+p{max-width:35rem;margin-top:1.2rem;color:#526274;font-size:1.08rem;line-height:1.75}.technical-section__details{border-top:1px solid #aebdca}details{border-bottom:1px solid #aebdca}summary{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.35rem 0;color:#1c2a3c;font-weight:700;cursor:pointer;list-style:none}summary::-webkit-details-marker{display:none}summary svg{width:1.2rem;transition:transform 180ms ease}summary path{stroke:#0078d4;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}details[open] summary svg{transform:rotate(180deg)}details p{padding:0 2.5rem 1.5rem 0;color:#526274;line-height:1.75}@media(max-width:767px){.technical-section__grid{grid-template-columns:1fr}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicalDetailsComponent {
  readonly title = input.required<string>();
  readonly intro = input.required<string>();
  readonly groups = input.required<readonly TechnicalGroup[]>();
  readonly desktopExpanded = input(false);
}
