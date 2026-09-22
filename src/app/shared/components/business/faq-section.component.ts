import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContentItem } from '../../../data/business-content.data';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  template: `
    <section class="faq-section">
      <div class="container-custom faq-section__grid">
        <h2>{{ title() }}</h2>
        <div class="faq-section__list">
          @for (item of items(); track item.title) {
            <details>
              <summary>{{ item.title }}<span aria-hidden="true">+</span></summary>
              <p>{{ item.description }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host{display:block}.faq-section{padding-block:clamp(4.5rem,8vw,7rem);background:#fff}.faq-section__grid{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:clamp(2.5rem,8vw,7rem)}h2{max-width:12ch;color:#1c2a3c;font-size:clamp(2.25rem,4.5vw,4rem);line-height:1}.faq-section__list{border-top:1px solid #c5d1db}details{border-bottom:1px solid #c5d1db}summary{display:flex;justify-content:space-between;gap:1.5rem;padding:1.4rem 0;color:#1c2a3c;font-size:1.08rem;font-weight:700;cursor:pointer;list-style:none}summary::-webkit-details-marker{display:none}summary span{color:#0078d4;font-size:1.4rem;font-weight:400;transition:transform 180ms ease}details[open] summary span{transform:rotate(45deg)}details p{max-width:62ch;padding:0 3rem 1.5rem 0;color:#526274;line-height:1.75}@media(max-width:767px){.faq-section__grid{grid-template-columns:1fr}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSectionComponent {
  readonly title = input.required<string>();
  readonly items = input.required<readonly ContentItem[]>();
}
