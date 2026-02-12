import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="min-h-screen py-24 lg:py-32">
      <div class="container-custom max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-display font-bold text-surface-100 mb-6">
          Terminos y Condiciones
        </h1>
        <p class="text-surface-400 mb-10">
          Ultima actualizacion: 12 de febrero de 2026.
        </p>

        <section class="space-y-6 text-surface-300">
          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              1. Aceptacion de los terminos
            </h2>
            <p>
              Al acceder y utilizar este sitio web, aceptas estos Terminos y Condiciones.
              Si no estas de acuerdo, no utilices el sitio.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              2. Uso del sitio
            </h2>
            <p>
              Este sitio tiene fines informativos y comerciales relacionados con servicios de
              desarrollo de software. Te comprometés a usarlo de forma legal y sin afectar su
              funcionamiento.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              3. Propiedad intelectual
            </h2>
            <p>
              Los contenidos del sitio (textos, imagenes, diseno y marca) pertenecen a
              DevMenteStudio o a sus titulares correspondientes. No esta permitido su uso
              comercial sin autorizacion previa y por escrito.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              4. Formulario de contacto
            </h2>
            <p>
              La informacion enviada mediante formularios se usa para responder consultas y
              potenciales propuestas comerciales. El envio no crea relacion contractual
              automatica.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              5. Limitacion de responsabilidad
            </h2>
            <p>
              Hacemos esfuerzos razonables para mantener la informacion actualizada y
              disponible, pero no garantizamos ausencia total de errores ni interrupciones del
              servicio.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              6. Enlaces a terceros
            </h2>
            <p>
              El sitio puede incluir enlaces externos. DevMenteStudio no controla ni asume
              responsabilidad por contenidos o politicas de terceros.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              7. Cambios en estos terminos
            </h2>
            <p>
              Podemos actualizar estos terminos en cualquier momento. La version vigente sera
              la publicada en esta pagina.
            </p>
          </article>

          <article>
            <h2 class="text-2xl font-display font-semibold text-surface-100 mb-3">
              8. Contacto
            </h2>
            <p>
              Para consultas legales o comerciales escribinos a
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
export class TermsComponent {}
