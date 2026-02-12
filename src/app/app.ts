import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from './shared/components/layout';
import { ChatComponent } from './shared/components/ui/chat/chat.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
    <app-chat />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly seoService = inject(SeoService);

  constructor() {
    this.seoService.init();
  }
}
