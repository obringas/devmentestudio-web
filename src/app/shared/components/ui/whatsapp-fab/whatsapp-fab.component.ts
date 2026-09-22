import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { siteConfig } from '../../../../config/site.config';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" [attr.aria-label]="label()">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26A9.9 9.9 0 0 1 12.05 2c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7 9.9 9.9 0 0 1-9.88 9.89M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.23-6.16-3.48-8.41"/>
      </svg>
    </a>
  `,
  styles: `
    :host{display:none}@media(max-width:767px){:host{display:block}a{position:fixed;right:1rem;bottom:1rem;z-index:60;display:grid;place-items:center;width:3.25rem;height:3.25rem;border-radius:50%;background:#00965f;color:#fff;box-shadow:0 14px 30px -14px rgba(0,75,46,.9)}svg{width:1.55rem}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappFabComponent {
  private readonly locale = inject(LocaleService);
  readonly whatsappUrl = siteConfig.contact.whatsappUrl;
  readonly label = computed(() => this.locale.language() === 'en' ? 'Contact Oscar on WhatsApp' : 'Contactar a Oscar por WhatsApp');
}
