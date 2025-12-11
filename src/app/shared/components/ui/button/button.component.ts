import { 
  Component, 
  input, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [ngClass]="buttonClasses"
      class="btn"
    >
      @if (loading()) {
        <svg 
          class="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            class="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            stroke-width="4"
          />
          <path 
            class="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      }
      <ng-content />
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);

  get buttonClasses(): Record<string, boolean> {
    return {
      // Variants
      'btn-primary': this.variant() === 'primary',
      'btn-secondary': this.variant() === 'secondary',
      'btn-ghost': this.variant() === 'ghost',
      'btn-outline': this.variant() === 'outline',
      
      // Sizes
      'px-4 py-2 text-sm': this.size() === 'sm',
      'px-6 py-3 text-base': this.size() === 'md',
      'px-8 py-4 text-lg': this.size() === 'lg',
      
      // States
      'w-full': this.fullWidth(),
      'opacity-50 cursor-not-allowed': this.disabled() || this.loading(),
    };
  }
}
