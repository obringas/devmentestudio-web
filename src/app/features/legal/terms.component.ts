import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom max-w-4xl">
        <h1 class="mb-6 text-4xl font-display font-bold text-surface-100 md:text-5xl">
          {{ copy().title }}
        </h1>
        <p class="mb-10 text-surface-400">
          {{ copy().updatedAt }}
        </p>

        <section class="space-y-6 text-surface-300">
          @for (section of copy().sections; track section.title) {
            <article>
              <h2 class="mb-3 text-2xl font-display font-semibold text-surface-100">
                {{ section.title }}
              </h2>
              <p>
                {{ section.body }}
              </p>
            </article>
          }

          <article>
            <h2 class="mb-3 text-2xl font-display font-semibold text-surface-100">
              {{ copy().contactTitle }}
            </h2>
            <p>
              {{ copy().contactPrefix }}
              <a href="mailto:contacto@devmentestudio.com" class="text-primary-400 hover:text-primary-300">
                contacto@devmentestudio.com
              </a>.
            </p>
          </article>
        </section>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          title: 'Terms and Conditions',
          updatedAt: 'Last updated: February 12, 2026.',
          sections: [
            {
              title: '1. Acceptance of terms',
              body: 'By accessing and using this website, you accept these Terms and Conditions. If you do not agree, please do not use the site.',
            },
            {
              title: '2. Use of the site',
              body: 'This website is intended for informational and commercial purposes related to software development services. You agree to use it lawfully and without affecting its operation.',
            },
            {
              title: '3. Intellectual property',
              body: 'The site content, including text, imagery, design and brand assets, belongs to DevMenteStudio or its respective owners. Commercial use without prior written authorization is not allowed.',
            },
            {
              title: '4. Contact forms',
              body: 'Information submitted through forms is used to answer inquiries and potential commercial proposals. Submission does not automatically create a contractual relationship.',
            },
            {
              title: '5. Limitation of liability',
              body: 'We make reasonable efforts to keep the information available and updated, but we do not guarantee a total absence of errors or service interruptions.',
            },
            {
              title: '6. Third-party links',
              body: 'The website may include external links. DevMenteStudio does not control or assume responsibility for third-party content or policies.',
            },
            {
              title: '7. Changes to these terms',
              body: 'We may update these terms at any time. The current version will always be the one published on this page.',
            },
          ],
          contactTitle: '8. Contact',
          contactPrefix: 'For legal or commercial inquiries, email us at ',
        }
      : {
          title: 'Terminos y Condiciones',
          updatedAt: 'Ultima actualizacion: 12 de febrero de 2026.',
          sections: [
            {
              title: '1. Aceptacion de los terminos',
              body: 'Al acceder y utilizar este sitio web, aceptas estos Terminos y Condiciones. Si no estas de acuerdo, no utilices el sitio.',
            },
            {
              title: '2. Uso del sitio',
              body: 'Este sitio tiene fines informativos y comerciales relacionados con servicios de desarrollo de software. Te comprometés a usarlo de forma legal y sin afectar su funcionamiento.',
            },
            {
              title: '3. Propiedad intelectual',
              body: 'Los contenidos del sitio, como textos, imagenes, diseño y marca, pertenecen a DevMenteStudio o a sus titulares correspondientes. No esta permitido su uso comercial sin autorizacion previa y por escrito.',
            },
            {
              title: '4. Formulario de contacto',
              body: 'La informacion enviada mediante formularios se usa para responder consultas y potenciales propuestas comerciales. El envio no crea relacion contractual automatica.',
            },
            {
              title: '5. Limitacion de responsabilidad',
              body: 'Hacemos esfuerzos razonables para mantener la informacion actualizada y disponible, pero no garantizamos ausencia total de errores ni interrupciones del servicio.',
            },
            {
              title: '6. Enlaces a terceros',
              body: 'El sitio puede incluir enlaces externos. DevMenteStudio no controla ni asume responsabilidad por contenidos o politicas de terceros.',
            },
            {
              title: '7. Cambios en estos terminos',
              body: 'Podemos actualizar estos terminos en cualquier momento. La version vigente sera la publicada en esta pagina.',
            },
          ],
          contactTitle: '8. Contacto',
          contactPrefix: 'Para consultas legales o comerciales escribinos a ',
        }
  ));
}
