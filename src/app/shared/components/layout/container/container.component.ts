import { 
  Component, 
  input,
  ChangeDetectionStrategy 
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="containerClasses">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
  readonly size = input<'sm' | 'md' | 'lg' | 'full'>('lg');
  readonly padding = input<boolean>(true);

  get containerClasses(): Record<string, boolean> {
    return {
      'mx-auto w-full': true,
      'px-4 sm:px-6 lg:px-8': this.padding(),
      'max-w-4xl': this.size() === 'sm',
      'max-w-6xl': this.size() === 'md',
      'max-w-7xl': this.size() === 'lg',
      'max-w-none': this.size() === 'full',
    };
  }
}
