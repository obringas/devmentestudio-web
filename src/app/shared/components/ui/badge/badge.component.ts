import { 
  Component, 
  input, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { NgClass } from '@angular/common';

export type BadgeVariant = 'primary' | 'accent' | 'neutral';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    <span [ngClass]="badgeClasses">
      <ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('primary');
  readonly size = input<BadgeSize>('md');

  get badgeClasses(): Record<string, boolean> {
    return {
      // Base
      'inline-flex items-center font-medium rounded-full': true,
      
      // Variants
      'bg-primary-500/10 text-primary-400 border border-primary-500/20': this.variant() === 'primary',
      'bg-accent-500/10 text-accent-400 border border-accent-500/20': this.variant() === 'accent',
      'bg-surface-700/50 text-surface-300 border border-surface-600/50': this.variant() === 'neutral',
      
      // Sizes
      'px-2 py-0.5 text-2xs': this.size() === 'sm',
      'px-3 py-1 text-xs': this.size() === 'md',
    };
  }
}
