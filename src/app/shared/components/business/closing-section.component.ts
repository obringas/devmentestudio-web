import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-closing-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="closing-section">
      <div class="container-custom closing-section__inner">
        <h2>{{ title() }}</h2>
        <p>{{ text() }}</p>
        <div class="closing-section__actions">
          <a routerLink="/contacto" [queryParams]="{ servicio: 'modernizacion' }" class="btn-primary">{{ primaryCta() }}</a>
          <a [href]="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="btn-outline">{{ whatsappCta() }}</a>
        </div>
        <div class="closing-section__contacts">
          <a [href]="'mailto:' + email()">{{ email() }}</a>
          <a [href]="phoneUrl()">{{ phone() }}</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host{display:block}.closing-section{padding-block:clamp(5rem,10vw,9rem);background:#1c2a3c}.closing-section__inner{max-width:62rem;text-align:center}h2{color:#fff;font-size:clamp(2.4rem,5.5vw,5rem);line-height:.98}p{max-width:48rem;margin:1.5rem auto 0;color:#d7e2ec;font-size:clamp(1rem,2vw,1.2rem);line-height:1.75}.closing-section__actions{display:flex;justify-content:center;flex-wrap:wrap;gap:.8rem;margin-top:2.25rem}.closing-section__actions .btn-outline{border-color:#7392ad;color:#fff}.closing-section__actions .btn-outline:hover{background:#fff;color:#1c2a3c}.closing-section__contacts{display:flex;justify-content:center;flex-wrap:wrap;gap:.75rem 1.5rem;margin-top:2rem}.closing-section__contacts a{color:#9ed4f8;text-decoration:underline;text-underline-offset:.35em}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClosingSectionComponent {
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly primaryCta = input.required<string>();
  readonly whatsappCta = input.required<string>();
  readonly whatsappUrl = input.required<string>();
  readonly email = input.required<string>();
  readonly phone = input.required<string>();
  readonly phoneUrl = input.required<string>();
}
