import { 
  Component, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { 
  HeroComponent,
  ServicesPreviewComponent,
  TechStackComponent,
  CtaSectionComponent
} from './components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesPreviewComponent,
    TechStackComponent,
    CtaSectionComponent,
  ],
  template: `
    <app-hero />
    <app-services-preview />
    <app-tech-stack />
    <app-cta-section />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
