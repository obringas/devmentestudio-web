import {
  Component,
  ChangeDetectionStrategy,
  inject
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FOOTER_SECTIONS, SOCIAL_LINKS } from '../../../../data';
import { siteConfig } from '../../../../config/site.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly footerSections = FOOTER_SECTIONS;
  readonly socialLinks = SOCIAL_LINKS;
  readonly siteName = siteConfig.name;
  readonly currentYear = new Date().getFullYear();

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
