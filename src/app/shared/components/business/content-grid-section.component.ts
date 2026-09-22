import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentItem } from '../../../data/business-content.data';

@Component({
  selector: 'app-content-grid-section',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="business-section" [class.business-section--tint]="tinted()" [attr.id]="sectionId() || null">
      <div class="container-custom">
        <div class="business-section__heading">
          <h2>{{ title() }}</h2>
          @if (intro()) { <p>{{ intro() }}</p> }
        </div>

        <div class="business-grid" [class.business-grid--steps]="numbered()">
          @for (item of items(); track item.title; let index = $index) {
            <article class="business-item">
              @if (numbered()) {
                <span class="business-item__number">{{ index + 1 }}</span>
              } @else {
                <span class="business-item__mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path [attr.d]="iconPath(index)" />
                  </svg>
                </span>
              }
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </article>
          }
        </div>

        @if (closingText()) {
          <div class="business-section__close">
            <p>{{ closingText() }}</p>
            @if (closingLink()) {
              <a [routerLink]="closingLink()" [fragment]="closingFragment() || undefined">{{ closingLinkLabel() }}</a>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .business-section { padding-block: clamp(4.5rem, 8vw, 7.5rem); background: #fff; }
    .business-section--tint { background: #f1f6fa; }
    .business-section__heading { max-width: 48rem; margin-bottom: clamp(2rem, 5vw, 3.75rem); }
    .business-section__heading h2 { color: #1c2a3c; font-size: clamp(2.25rem, 4vw, 4rem); line-height: 1; }
    .business-section__heading p { max-width: 42rem; margin-top: 1rem; color: #526274; font-size: clamp(1.05rem, 2vw, 1.25rem); }
    .business-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 6vw, 5rem); border-top: 1px solid #cad7e2; }
    .business-item { display: grid; grid-template-columns: 2.75rem 1fr; gap: 1rem; padding-block: 2rem; border-bottom: 1px solid #cad7e2; }
    .business-item__mark { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: .75rem; background: #e1f1fc; color: #0067b8; }
    .business-item__mark svg { width: 1.2rem; }
    .business-item__mark path { stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    .business-item__number { color: #0078d4; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.2rem; line-height: 1; font-variant-numeric: tabular-nums; }
    .business-item h3 { color: #1c2a3c; font-size: 1.2rem; line-height: 1.25; }
    .business-item p { margin-top: .65rem; color: #526274; line-height: 1.7; }
    .business-section__close { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; margin-top: 2.25rem; padding: 1.4rem 0; border-bottom: 1px solid #1c2a3c; }
    .business-section__close p { max-width: 52rem; color: #1c2a3c; font-size: 1.08rem; font-weight: 600; }
    .business-section__close a { flex: none; color: #0067b8; font-weight: 700; text-decoration: underline; text-underline-offset: .3em; }
    @media (max-width: 767px) {
      .business-grid { grid-template-columns: 1fr; }
      .business-item { grid-template-columns: 2.4rem 1fr; }
      .business-section__close { align-items: flex-start; flex-direction: column; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentGridSectionComponent {
  readonly title = input.required<string>();
  readonly intro = input<string>('');
  readonly items = input.required<readonly ContentItem[]>();
  readonly sectionId = input<string>('');
  readonly tinted = input(false);
  readonly numbered = input(false);
  readonly closingText = input<string>('');
  readonly closingLink = input<string>('');
  readonly closingLinkLabel = input<string>('');
  readonly closingFragment = input<string>('');

  iconPath(index: number): string {
    return [
      'M12 3v18M7 8h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8',
      'M6 3v4M18 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z',
      'M4 14s2-7 8-7 8 7 8 7-2 7-8 7-8-7-8-7Zm8-3v3l2 2',
      'M5 4h14v16H5zM8 8h8M8 12h5M8 16h7',
    ][index % 4];
  }
}
