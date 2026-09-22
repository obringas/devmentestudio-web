import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-continuity-diagram',
  standalone: true,
  template: `
    <div class="continuity" role="img" [attr.aria-label]="ariaLabel()">
      <div class="continuity__system continuity__system--current">
        <span>{{ currentLabel() }}</span>
        <strong>{{ currentState() }}</strong>
        <div class="continuity__modules" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </div>
      </div>

      <div class="continuity__bridge" aria-hidden="true">
        <span></span><span></span><span></span>
        <svg viewBox="0 0 96 24" fill="none">
          <path d="M2 12h86m-8-8 8 8-8 8" />
        </svg>
        <small>{{ bridgeLabel() }}</small>
      </div>

      <div class="continuity__system continuity__system--new">
        <span>{{ newLabel() }}</span>
        <strong>{{ newState() }}</strong>
        <div class="continuity__modules" aria-hidden="true">
          <i></i><i></i><i></i><i></i>
        </div>
      </div>

      <div class="continuity__operation">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 12 4 4L19 6" />
        </svg>
        {{ operationLabel() }}
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
    .continuity {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 7rem minmax(0, 1fr);
      align-items: center;
      gap: 1rem;
      min-height: 25rem;
      padding: clamp(1.25rem, 3vw, 2.5rem);
      border-radius: 1rem;
      background: #eef5fb;
      box-shadow: 0 30px 70px -40px rgba(28, 42, 60, 0.55);
      overflow: hidden;
    }
    .continuity::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,.92), rgba(232,243,252,.66));
      pointer-events: none;
    }
    .continuity__system, .continuity__bridge, .continuity__operation { position: relative; z-index: 1; }
    .continuity__system {
      padding: 1.25rem;
      border-radius: .875rem;
      background: #fff;
      box-shadow: 0 18px 40px -28px rgba(28, 42, 60, .55);
    }
    .continuity__system--new { background: #1c2a3c; color: #fff; }
    .continuity__system > span {
      display: block;
      color: #516174;
      font-size: .72rem;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
    }
    .continuity__system--new > span { color: #a9c9e8; }
    .continuity__system strong {
      display: block;
      margin-top: .55rem;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.35rem, 2.5vw, 1.8rem);
      line-height: 1.05;
    }
    .continuity__modules { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; margin-top: 1.25rem; }
    .continuity__modules i { height: 2.25rem; border-radius: .4rem; background: #e5eaf0; }
    .continuity__system--new .continuity__modules i { background: #294461; }
    .continuity__system--new .continuity__modules i:first-child,
    .continuity__system--new .continuity__modules i:nth-child(3) { background: #0078d4; }
    .continuity__bridge { text-align: center; color: #1c2a3c; }
    .continuity__bridge > span {
      display: inline-block;
      width: .45rem; height: .45rem;
      margin-inline: .12rem;
      border-radius: 50%;
      background: #0078d4;
      animation: handoff 2.4s cubic-bezier(.22,1,.36,1) infinite;
    }
    .continuity__bridge > span:nth-child(2) { animation-delay: .2s; }
    .continuity__bridge > span:nth-child(3) { animation-delay: .4s; }
    .continuity__bridge svg { width: 100%; margin-block: .35rem; }
    .continuity__bridge path { stroke: #0078d4; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .continuity__bridge small { display: block; font-size: .68rem; font-weight: 700; line-height: 1.3; }
    .continuity__operation {
      grid-column: 1 / -1;
      justify-self: center;
      display: flex;
      align-items: center;
      gap: .55rem;
      padding: .75rem 1rem;
      border-radius: 999px;
      background: #fff;
      color: #1c2a3c;
      font-size: .82rem;
      font-weight: 700;
      box-shadow: 0 14px 30px -24px rgba(28, 42, 60, .8);
    }
    .continuity__operation svg { width: 1.1rem; }
    .continuity__operation path { stroke: #00965f; stroke-width: 2.25; stroke-linecap: round; stroke-linejoin: round; }
    @keyframes handoff { 0%,100% { opacity:.25; transform:translateY(0); } 45% { opacity:1; transform:translateY(-3px); } }
    @media (max-width: 640px) {
      .continuity { grid-template-columns: 1fr; min-height: auto; }
      .continuity__bridge { transform: rotate(90deg); width: 5rem; justify-self: center; margin-block: -.75rem; }
      .continuity__bridge small { display: none; }
      .continuity__operation { grid-column: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .continuity__bridge > span { animation: none; opacity: .7; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinuityDiagramComponent {
  readonly ariaLabel = input.required<string>();
  readonly currentLabel = input.required<string>();
  readonly currentState = input.required<string>();
  readonly newLabel = input.required<string>();
  readonly newState = input.required<string>();
  readonly bridgeLabel = input.required<string>();
  readonly operationLabel = input.required<string>();
}
