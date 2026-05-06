import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom max-w-4xl">
        <h1 class="mb-6 text-4xl font-display font-bold text-surface-900 md:text-5xl">
          {{ copy().title }}
        </h1>
        <p class="mb-10 text-surface-500">
          {{ copy().updatedAt }}
        </p>

        <section class="space-y-6 text-surface-600">
          @for (section of copy().sections; track section.title) {
            <article>
              <h2 class="mb-3 text-2xl font-display font-semibold text-surface-900">
                {{ section.title }}
              </h2>
              <p>{{ section.body }}</p>
            </article>
          }

          <article>
            <h2 class="mb-3 text-2xl font-display font-semibold text-surface-900">
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
export class PrivacyComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          title: 'Privacy Policy',
          updatedAt: 'Last updated: February 12, 2026.',
          sections: [
            { title: '1. Data controller', body: 'DevMenteStudio is responsible for the processing of personal data collected through this website.' },
            { title: '2. Data we collect', body: 'We may collect your name, email, company, phone number and any information you voluntarily share through contact forms.' },
            { title: '3. Purpose of use', body: 'We use the data to answer inquiries, prepare commercial proposals and follow up on service requests.' },
            { title: '4. Legal basis', body: 'Processing is based on your consent when submitting your information and, where applicable, on pre-contractual management of service requests.' },
            { title: '5. Data retention', body: 'We keep information only for as long as necessary to fulfill the stated purposes and applicable legal obligations.' },
            { title: '6. Third-party sharing', body: 'We do not sell personal data. We only share information with technical providers when necessary to operate the service under confidentiality obligations.' },
            { title: '7. Your rights', body: 'You may request access, rectification or deletion of your data, as well as revoke your consent, by writing to our contact email.' },
            { title: '8. Security', body: 'We apply reasonable technical and organizational measures to protect information against unauthorized access, loss or alteration.' },
          ],
          contactTitle: '9. Contact',
          contactPrefix: 'For privacy-related questions, email us at ',
        }
      : {
          title: 'Politica de Privacidad',
          updatedAt: 'Ultima actualizacion: 12 de febrero de 2026.',
          sections: [
            { title: '1. Responsable del tratamiento', body: 'DevMenteStudio es responsable del tratamiento de los datos personales recabados a traves de este sitio web.' },
            { title: '2. Datos que recopilamos', body: 'Podemos recopilar nombre, email, empresa, telefono y cualquier dato que compartas de forma voluntaria en formularios de contacto.' },
            { title: '3. Finalidad del uso', body: 'Usamos los datos para responder consultas, preparar propuestas comerciales y dar seguimiento a solicitudes de servicio.' },
            { title: '4. Base de legitimacion', body: 'El tratamiento se basa en tu consentimiento al enviarnos datos y, cuando corresponda, en la gestion precontractual de solicitudes.' },
            { title: '5. Conservacion de datos', body: 'Conservamos la informacion durante el tiempo necesario para cumplir las finalidades indicadas y obligaciones legales aplicables.' },
            { title: '6. Cesion de datos a terceros', body: 'No vendemos datos personales. Solo compartimos informacion con proveedores tecnicos cuando es necesario para operar el servicio, bajo deberes de confidencialidad.' },
            { title: '7. Derechos del titular', body: 'Podes solicitar acceso, rectificacion o eliminacion de tus datos, asi como revocar el consentimiento otorgado, escribiendo a nuestro correo de contacto.' },
            { title: '8. Seguridad', body: 'Aplicamos medidas tecnicas y organizativas razonables para proteger los datos frente a accesos no autorizados, perdida o alteracion.' },
          ],
          contactTitle: '9. Contacto',
          contactPrefix: 'Para consultas sobre privacidad escribinos a ',
        }
  ));
}
