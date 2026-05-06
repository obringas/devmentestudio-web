import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { getHeroContent } from '../../../../data';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <!-- Atmospheric background -->
      <div class="hero__bg" aria-hidden="true">
        <div class="hero__grain"></div>
        <div class="hero__glow hero__glow--warm"></div>
        <div class="hero__glow hero__glow--cool"></div>
      </div>

      <div class="container-custom relative" style="z-index:1">
        <!-- Top rule with label -->
        <div class="hero__top-rule">
          <div class="hero__rule-line"></div>
          <span class="hero__rule-label">DevMenteStudio · Studio Work · 2026</span>
          <div class="hero__rule-line"></div>
        </div>

        <!-- Two-column body -->
        <div class="hero__body">

          <!-- LEFT: Content -->
          <div class="hero__left">

            <!-- Status badge -->
            <div class="hero__status">
              <span class="hero__status-dot"></span>
              <span>{{ copy().availability }}</span>
            </div>

            <!-- Editorial headline -->
            <h1 class="hero__headline">
              <span class="hero__hl-roman">{{ copy().titleStart }}</span>
              <em class="hero__hl-italic">{{ copy().titleAccent }}</em>
              <span class="hero__hl-roman">{{ copy().titleEnd }}</span>
            </h1>

            <!-- Description -->
            <p class="hero__desc">{{ copy().description }}</p>

            <!-- CTAs -->
            <div class="hero__actions">
              <a routerLink="/contacto" class="hero__btn hero__btn--fill">
                {{ copy().primaryCta }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a routerLink="/portfolio" class="hero__btn hero__btn--outline">
                {{ copy().secondaryCta }}
              </a>
            </div>

            <!-- Tags -->
            <div class="hero__tags">
              @for (tag of copy().tags; track tag) {
                <span class="hero__tag">{{ tag }}</span>
              }
            </div>

            <!-- Metrics row -->
            <div class="hero__metrics">
              @for (metric of copy().metrics; track metric.value) {
                <div class="hero__metric">
                  <span class="hero__metric-num">{{ metric.value }}</span>
                  <span class="hero__metric-txt">{{ metric.label }}</span>
                </div>
              }
            </div>
          </div>

          <!-- RIGHT: Visual composition panel -->
          <div class="hero__right">
            <span class="hero__ghost" aria-hidden="true">DM</span>

            <div class="hero__panel">
              <!-- Panel chrome top bar -->
              <div class="hero__panel-top">
                <div class="hero__panel-dots">
                  <b></b><b></b><b></b>
                </div>
                <span class="hero__panel-path">studio.devmente / {{ copy().reelSubtitle }}</span>
                <span class="hero__panel-badge">{{ copy().reelChip }}</span>
              </div>

              <!-- Code-as-art composition -->
              <div class="hero__code">
                <div class="hero__line hero__line--comment">// {{ copy().reelTitle }}</div>
                <div class="hero__line">
                  <span class="t-kw">export const</span>
                  <span class="t-fn"> studio</span>
                  <span class="t-op"> = {{'{'  }}</span>
                </div>
                <div class="hero__line hero__line--in">
                  <span class="t-prop">direction</span>
                  <span class="t-op">: </span>
                  <span class="t-str">'{{ copy().reelPill }}'</span>
                  <span class="t-op">,</span>
                </div>
                <div class="hero__line hero__line--in">
                  <span class="t-prop">stack</span>
                  <span class="t-op">: </span>
                  <span class="t-str">'Angular + .NET + Node'</span>
                  <span class="t-op">,</span>
                </div>
                <div class="hero__line hero__line--in">
                  <span class="t-prop">ssr</span>
                  <span class="t-op">: </span>
                  <span class="t-bool">true</span>
                  <span class="t-op">,</span>
                </div>
                <div class="hero__line hero__line--in">
                  <span class="t-prop">premium</span>
                  <span class="t-op">: </span>
                  <span class="t-bool">true</span>
                  <span class="t-op">,</span>
                </div>
                <div class="hero__line">
                  <span class="t-op">{{ '}' }}</span>
                </div>
                <span class="hero__cursor" aria-hidden="true"></span>
              </div>

              <!-- Indicator chips -->
              <div class="hero__chips">
                <div class="hero__chip">
                  <span class="hero__chip-dot"></span>
                  <div>
                    <b>{{ copy().floatingA.title }}</b>
                    <small>{{ copy().floatingA.subtitle }}</small>
                  </div>
                </div>
                <div class="hero__chip">
                  <span class="hero__chip-dot hero__chip-dot--warm"></span>
                  <div>
                    <b>{{ copy().floatingB.title }}</b>
                    <small>{{ copy().floatingB.subtitle }}</small>
                  </div>
                </div>
              </div>

              <!-- Info cards -->
              <div class="hero__info-row">
                <div class="hero__info">
                  <span class="hero__info-lbl">{{ copy().experienceCard.label }}</span>
                  <strong class="hero__info-ttl">{{ copy().experienceCard.title }}</strong>
                  <p class="hero__info-dsc">{{ copy().experienceCard.description }}</p>
                </div>
                <div class="hero__info hero__info--accent">
                  <span class="hero__info-lbl">{{ copy().techCard.label }}</span>
                  <strong class="hero__info-ttl">{{ copy().techCard.title }}</strong>
                  <p class="hero__info-dsc">{{ copy().techCard.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom rule -->
        <div class="hero__bottom-rule">
          <div class="hero__rule-line"></div>
          <span class="hero__rule-label">{{ copy().reelFooterEyebrow }} · {{ copy().reelFooterText }}</span>
          <div class="hero__rule-line"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    /* ── Palette tokens ── */
    .hero {
      --bg:             #f8fafc;
      --bg-panel:       #ffffff;
      --panel-border:   rgba(15, 23, 42, 0.08);
      --ivory:          #0f172a;
      --ivory-dim:      rgba(15, 23, 42, 0.60);
      --ivory-faint:    rgba(15, 23, 42, 0.12);
      --cognac:         #ea580c;
      --cognac-glow:    rgba(234, 88, 12, 0.25);
      --teal:           #0f766e;
      --teal-dim:       rgba(15, 118, 110, 0.2);
      --font-serif:     'Cormorant Garamond', Georgia, serif;
      --font-mono:      'JetBrains Mono', 'Consolas', monospace;

      position: relative;
      min-height: 100svh;
      display: flex;
      align-items: center;
      padding-block: 5rem 4rem;
      background: var(--bg);
      overflow: hidden;
    }

    /* ── Background ── */
    .hero__bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .hero__grain {
      position: absolute;
      inset: 0;
      opacity: 0.032;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 180px 180px;
    }
    .hero__glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.16;
    }
    .hero__glow--warm {
      width: 60vw; height: 60vw;
      top: -25%; left: -12%;
      background: radial-gradient(circle, rgba(234, 88, 12, 0.4), transparent 60%);
    }
    .hero__glow--cool {
      width: 48vw; height: 48vw;
      bottom: -18%; right: -10%;
      background: radial-gradient(circle, rgba(15, 118, 110, 0.3), transparent 60%);
    }

    /* ── Horizontal rules ── */
    .hero__top-rule,
    .hero__bottom-rule {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .hero__top-rule  { margin-block-end: 3.5rem; }
    .hero__bottom-rule { margin-block-start: 3.5rem; }
    .hero__rule-line {
      flex: 1;
      height: 1px;
      background: var(--ivory-faint);
    }
    .hero__rule-label {
      font-family: var(--font-mono);
      font-size: 0.60rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--ivory-dim);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60ch;
    }

    /* ── Layout ── */
    .hero__body {
      display: grid;
      gap: 4rem;
      align-items: center;
    }
    @media (min-width: 1024px) {
      .hero__body {
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
      }
    }

    /* ── LEFT: Content ── */
    .hero__status {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      font-family: var(--font-mono);
      font-size: 0.67rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--ivory-dim);
      padding: 0.45rem 0.9rem;
      border: 1px solid var(--ivory-faint);
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.03);
    }
    .hero__status-dot {
      flex-shrink: 0;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--cognac);
      box-shadow: 0 0 10px var(--cognac-glow);
      animation: statusPulse 2.6s ease-in-out infinite;
    }

    /* Headline — big editorial serif */
    .hero__headline {
      font-family: var(--font-serif);
      font-weight: 600;
      font-size: clamp(2.8rem, 4.5vw + 0.5rem, 5.25rem);
      line-height: 1.04;
      letter-spacing: -0.01em;
      color: var(--ivory);
      margin-top: 1.75rem;
      display: block;
    }
    .hero__hl-roman { display: block; }
    .hero__hl-italic {
      display: block;
      font-style: italic;
      color: var(--cognac);
      font-size: 1.2em;
      line-height: 0.96;
    }

    .hero__desc {
      margin-top: 1.75rem;
      font-size: 1.02rem;
      line-height: 1.78;
      color: var(--ivory-dim);
      max-width: 54ch;
    }

    /* CTAs */
    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.875rem;
      margin-top: 2.25rem;
    }
    .hero__btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.85rem 1.75rem;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;
      text-decoration: none;
      cursor: pointer;
    }
    .hero__btn--fill {
      background: var(--cognac);
      color: #ffffff;
      box-shadow: 0 0 40px -8px var(--cognac-glow);
    }
    .hero__btn--fill:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 56px -4px var(--cognac-glow);
    }
    .hero__btn--fill svg { width: 15px; height: 15px; }
    .hero__btn--outline {
      border: 1px solid var(--ivory-faint);
      color: var(--ivory-dim);
      background: transparent;
    }
    .hero__btn--outline:hover {
      border-color: rgba(15, 23, 42, 0.38);
      color: var(--ivory);
      background: rgba(15, 23, 42, 0.04);
    }

    /* Tags */
    .hero__tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 2rem;
    }
    .hero__tag {
      font-family: var(--font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--teal);
      padding: 0.32rem 0.7rem;
      border: 1px solid rgba(15, 118, 110, 0.28);
      border-radius: 4px;
      background: rgba(15, 118, 110, 0.06);
    }

    /* Metrics — typeset table */
    .hero__metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-top: 2.25rem;
      border-top: 1px solid var(--ivory-faint);
    }
    .hero__metric {
      padding: 1.25rem 0.75rem 1.25rem 0;
      border-right: 1px solid var(--ivory-faint);
    }
    .hero__metric:last-child { border-right: none; }
    .hero__metric + .hero__metric { padding-left: 0.75rem; }
    .hero__metric-num {
      display: block;
      font-family: var(--font-serif);
      font-weight: 600;
      font-size: 2.2rem;
      line-height: 1;
      color: var(--ivory);
      letter-spacing: -0.02em;
    }
    .hero__metric-txt {
      display: block;
      font-size: 0.7rem;
      line-height: 1.5;
      color: var(--ivory-dim);
      margin-top: 0.5rem;
    }

    /* ── RIGHT: Panel ── */
    .hero__right {
      position: relative;
    }

    /* Ghost watermark text */
    .hero__ghost {
      position: absolute;
      font-family: var(--font-serif);
      font-weight: 700;
      font-style: italic;
      font-size: clamp(11rem, 18vw, 20rem);
      line-height: 0.85;
      color: rgba(15, 23, 42, 0.022);
      pointer-events: none;
      user-select: none;
      right: -0.05em;
      top: -0.18em;
      z-index: 0;
      letter-spacing: -0.04em;
    }

    .hero__panel {
      position: relative;
      z-index: 1;
      border-radius: 1.5rem;
      border: 1px solid var(--panel-border);
      background: var(--bg-panel);
      overflow: hidden;
      box-shadow:
        0 0 0 1px rgba(15, 23, 42, 0.03),
        0 30px 80px -20px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }

    /* Panel top bar */
    .hero__panel-top {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding: 0.875rem 1.25rem;
      border-bottom: 1px solid var(--panel-border);
      background: rgba(15, 23, 42, 0.02);
    }
    .hero__panel-dots {
      display: flex;
      gap: 0.38rem;
      flex-shrink: 0;
    }
    .hero__panel-dots b {
      display: block;
      width: 10px; height: 10px;
      border-radius: 50%;
      background: rgba(15, 23, 42, 0.12);
    }
    .hero__panel-dots b:first-child  { background: rgba(234, 88, 12, 0.5); }
    .hero__panel-dots b:nth-child(2) { background: rgba(15, 23, 42, 0.22); }
    .hero__panel-path {
      flex: 1;
      font-family: var(--font-mono);
      font-size: 0.60rem;
      letter-spacing: 0.08em;
      color: var(--ivory-dim);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hero__panel-badge {
      font-family: var(--font-mono);
      font-size: 0.57rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--teal);
      padding: 0.25rem 0.6rem;
      border: 1px solid rgba(15, 118, 110, 0.28);
      border-radius: 4px;
      flex-shrink: 0;
    }

    /* Code block */
    .hero__code {
      padding: 1.5rem 1.5rem 0.875rem;
      font-family: var(--font-mono);
      font-size: 0.81rem;
      line-height: 1.9;
    }
    .hero__line          { display: block; }
    .hero__line--comment { color: rgba(15, 23, 42, 0.26); font-style: italic; }
    .hero__line--in      { padding-left: 1.5rem; }

    .t-kw   { color: var(--cognac); }
    .t-fn   { color: #0284c7; }
    .t-op   { color: rgba(15, 23, 42, 0.38); }
    .t-prop { color: #0f766e; }
    .t-str  { color: #059669; }
    .t-bool { color: var(--cognac); font-style: italic; }

    .hero__cursor {
      display: inline-block;
      width: 2px; height: 1em;
      background: var(--cognac);
      margin-left: 3px;
      vertical-align: text-bottom;
      animation: cursorBlink 1.1s step-start infinite;
    }

    /* Chips */
    .hero__chips {
      display: flex;
      gap: 0.625rem;
      padding: 0.75rem 1.25rem 1rem;
      flex-wrap: wrap;
    }
    .hero__chip {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.65rem 0.875rem;
      border: 1px solid var(--panel-border);
      border-radius: 0.75rem;
      background: rgba(15, 23, 42, 0.025);
      flex: 1;
      min-width: 130px;
    }
    .hero__chip-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      background: var(--teal);
      box-shadow: 0 0 8px rgba(15, 118, 110, 0.25);
    }
    .hero__chip-dot--warm {
      background: var(--cognac);
      box-shadow: 0 0 8px var(--cognac-glow);
    }
    .hero__chip b {
      display: block;
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--ivory);
    }
    .hero__chip small {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.60rem;
      color: var(--ivory-dim);
      margin-top: 0.1rem;
      letter-spacing: 0.04em;
    }

    /* Info cards at panel bottom */
    .hero__info-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-top: 1px solid var(--panel-border);
    }
    .hero__info {
      padding: 1.125rem 1.25rem;
    }
    .hero__info + .hero__info {
      border-left: 1px solid var(--panel-border);
    }
    .hero__info--accent {
      background: rgba(234, 88, 12, 0.04);
    }
    .hero__info-lbl {
      display: block;
      font-family: var(--font-mono);
      font-size: 0.57rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: var(--ivory-dim);
    }
    .hero__info-ttl {
      display: block;
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ivory);
      margin-top: 0.3rem;
      line-height: 1.25;
    }
    .hero__info-dsc {
      font-size: 0.72rem;
      line-height: 1.55;
      color: var(--ivory-dim);
      margin-top: 0.4rem;
    }

    /* ── Animations ── */
    @keyframes statusPulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.35; }
    }
    @keyframes cursorBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero__status-dot,
      .hero__cursor {
        animation: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => getHeroContent(this.language()));
}
