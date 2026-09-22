import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from './shared/components/layout';
import { ChatComponent } from './shared/components/ui/chat/chat.component';
import { SeoService } from './core/services/seo.service';
import { LocaleService } from './core/services/locale.service';
import { WhatsappFabComponent } from './shared/components/ui/whatsapp-fab/whatsapp-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatComponent, WhatsappFabComponent],
  template: `
    <div class="page-shell min-h-screen flex flex-col overflow-hidden">
      <app-header />
      <main class="flex-1">
        <router-outlet />
      </main>
      <app-footer />
    </div>
    <app-chat />
    <app-whatsapp-fab />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly seoService = inject(SeoService);
  private readonly localeService = inject(LocaleService);

  constructor() {
    this.localeService.language();
    this.seoService.init();
  }
}
