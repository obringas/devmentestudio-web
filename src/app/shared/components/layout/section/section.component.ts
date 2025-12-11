import { 
  Component, 
  input,
  ChangeDetectionStrategy 
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [NgClass],
  template: `
    <section [ngClass]="sectionClasses" [id]="sectionId()">
      <ng-content />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  readonly sectionId = input<string>('');
  readonly spacing = input<'none' | 'sm' | 'md' | 'lg'>('md');
  readonly background = input<'default' | 'alt' | 'gradient'>('default');

  get sectionClasses(): Record<string, boolean> {
    return {
      // Spacing
      'py-0': this.spacing() === 'none',
      'py-12 md:py-16': this.spacing() === 'sm',
      'py-16 md:py-24 lg:py-32': this.spacing() === 'md',
      'py-24 md:py-32 lg:py-40': this.spacing() === 'lg',
      
      // Background
      'bg-surface-950': this.background() === 'default',
      'bg-surface-900/30': this.background() === 'alt',
      'bg-gradient-to-b from-surface-950 via-surface-900/50 to-surface-950': this.background() === 'gradient',
    };
  }
}
