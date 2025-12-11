import { 
  Component, 
  input, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { NgClass } from '@angular/common';

export type CardVariant = 'default' | 'interactive' | 'glass';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="cardClasses">
      @if (header()) {
        <div class="mb-4">
          <ng-content select="[card-header]" />
        </div>
      }
      <ng-content />
      @if (footer()) {
        <div class="mt-4 pt-4 border-t border-surface-800">
          <ng-content select="[card-footer]" />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly variant = input<CardVariant>('default');
  readonly padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  readonly header = input<boolean>(false);
  readonly footer = input<boolean>(false);
  readonly hoverable = input<boolean>(false);

  get cardClasses(): Record<string, boolean> {
    return {
      // Base
      'rounded-2xl transition-all duration-300': true,
      
      // Variants
      'bg-surface-900/50 border border-surface-800': this.variant() === 'default',
      'bg-surface-900/50 border border-surface-800 cursor-pointer hover:shadow-glow hover:-translate-y-1 hover:border-surface-700': this.variant() === 'interactive',
      'bg-surface-900/60 backdrop-blur-xl border border-surface-700/50': this.variant() === 'glass',
      
      // Padding
      'p-0': this.padding() === 'none',
      'p-4': this.padding() === 'sm',
      'p-6': this.padding() === 'md',
      'p-8': this.padding() === 'lg',
      
      // Hover
      'hover:border-surface-700 hover:bg-surface-900/70': this.hoverable() && this.variant() === 'default',
    };
  }
}
