import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-surface-100 mb-6">
          Politica de Privacidad
        </h1>
        <p class="text-surface-400 mb-10">
          Ultima actualizacion: 12 de febrero de 2026.
        </p>

        <section class="space-y-6 text-surface-300">
          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              1. Responsable del tratamiento
            </h2>
            <p>
              DevMenteStudio es responsable del tratamiento de los datos personales recabados
              a traves de este sitio web.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              2. Datos que recopilamos
            </h2>
            <p>
              Podemos recopilar nombre, email, empresa, telefono y cualquier dato que compartas
              de forma voluntaria en formularios de contacto.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              3. Finalidad del uso
            </h2>
            <p>
              Usamos los datos para responder consultas, preparar propuestas comerciales y dar
              seguimiento a solicitudes de servicio.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              4. Base de legitimacion
            </h2>
            <p>
              El tratamiento se basa en tu consentimiento al enviarnos datos y, cuando
              corresponda, en la gestion precontractual de solicitudes.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              5. Conservacion de datos
            </h2>
            <p>
              Conservamos la informacion durante el tiempo necesario para cumplir las finalidades
              indicadas y obligaciones legales aplicables.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              6. Cesion de datos a terceros
            </h2>
            <p>
              No vendemos datos personales. Solo compartimos informacion con proveedores
              tecnicos cuando es necesario para operar el servicio, bajo deberes de
              confidencialidad.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              7. Derechos del titular
            </h2>
            <p>
              Podes solicitar acceso, rectificacion o eliminacion de tus datos, asi como revocar
              el consentimiento otorgado, escribiendo a nuestro correo de contacto.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              8. Seguridad
            </h2>
            <p>
              Aplicamos medidas tecnicas y organizativas razonables para proteger los datos
              frente a accesos no autorizados, perdida o alteracion.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              9. Contacto
            </h2>
            <p>
              Para consultas sobre privacidad escribinos a
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
export class PrivacyComponent {}
