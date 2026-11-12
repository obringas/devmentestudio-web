import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { siteConfig } from '../../config/site.config';
import { ContactService, ContactSubmission } from '../../core/services/contact.service';
import { SOCIAL_LINKS } from '../../data/navigation.data';
import { LocaleService } from '../../core/services/locale.service';

type ContactFormControls = {
  name: FormControl<string>;
  email: FormControl<string>;
  company: FormControl<string>;
  service: FormControl<string>;
  budget: FormControl<string>;
  message: FormControl<string>;
  botcheck: FormControl<boolean>;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="contact-page">
      <header class="contact-head">
        <div class="container-custom">
          <p class="contact-head__eyebrow">{{ copy().eyebrow }}</p>
          <h1>{{ copy().title }}</h1>
          <p class="contact-head__lead">{{ copy().description }}</p>
        </div>
      </header>

      <section class="contact-body">
        <div class="container-custom contact-body__grid">
          <aside class="contact-aside">
            <div class="whatsapp-box">
              <span class="whatsapp-box__badge">{{ copy().whatsappBadge }}</span>
              <h2>{{ copy().whatsappBoxTitle }}</h2>
              <p>{{ copy().whatsappBoxText }}</p>
              <a
                [href]="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="whatsapp-box__btn"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{{ copy().whatsappDirectCta }}</span>
              </a>
            </div>

            <div class="contact-details">
              <h2>{{ copy().contactInfoTitle }}</h2>
              <dl>
                <div>
                  <dt>WhatsApp / Teléfono</dt>
                  <dd>
                    <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer">
                      +54 9 387 451-3777
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:contacto@devmentestudio.com">
                      contacto&#64;devmentestudio.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{{ copy().locationLabel }}</dt>
                  <dd>Salta, Argentina</dd>
                </div>
              </dl>
            </div>

            <div class="contact-socials">
              <h3>{{ copy().socialTitle }}</h3>
              <div class="contact-socials__list">
                @for (social of socials; track social.label) {
                  <a
                    [href]="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    [attr.aria-label]="social.label"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path [attr.d]="getSocialIconPath(social.platform)"></path>
                    </svg>
                  </a>
                }
              </div>
            </div>
          </aside>

          <div class="contact-form-panel">
            @if (submitted()) {
              <div class="py-12 text-center">
                <div class="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#00965f]/30 bg-[#00965f]/10">
                  <svg class="h-7 w-7 text-[#00965f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 class="mb-2 text-2xl font-display font-bold text-[#1c2a3c]">
                  {{ copy().successTitle }}
                </h3>
                <p class="mb-6 text-[#526274]">
                  {{ copy().successDescription }}
                </p>
                <button type="button" class="btn-outline" (click)="resetForm()">
                  {{ copy().sendAnother }}
                </button>
              </div>
            } @else {
              <form
                [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                [attr.aria-busy]="loading()"
              >
                <input
                  type="checkbox"
                  formControlName="botcheck"
                  class="hidden"
                  tabindex="-1"
                  autocomplete="off"
                  aria-hidden="true"
                />
                <div class="mb-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label for="name" class="contact-label">
                      {{ copy().fields.name }} <span class="text-red-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      formControlName="name"
                      class="input"
                      [ngClass]="{'border-red-500': isFieldInvalid('name')}"
                      [placeholder]="copy().placeholders.name"
                    />
                    @if (isFieldInvalid('name')) {
                      <p class="mt-1 text-sm text-red-600">{{ copy().errors.name }}</p>
                    }
                  </div>

                  <div>
                    <label for="email" class="contact-label">
                      {{ copy().fields.email }} <span class="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      formControlName="email"
                      class="input"
                      [ngClass]="{'border-red-500': isFieldInvalid('email')}"
                      [placeholder]="copy().placeholders.email"
                    />
                    @if (isFieldInvalid('email')) {
                      <p class="mt-1 text-sm text-red-600">{{ copy().errors.email }}</p>
                    }
                  </div>
                </div>

                <div class="mb-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label for="company" class="contact-label">
                      {{ copy().fields.company }}
                    </label>
                    <input
                      id="company"
                      type="text"
                      formControlName="company"
                      class="input"
                      [placeholder]="copy().placeholders.company"
                    />
                  </div>

                  <div>
                    <label for="service" class="contact-label">
                      {{ copy().fields.service }}
                    </label>
                    <select id="service" formControlName="service" class="input">
                      <option value="">{{ copy().selectOption }}</option>
                      @for (service of copy().serviceOptions; track service.value) {
                        <option [value]="service.value">{{ service.label }}</option>
                      }
                    </select>
                  </div>
                </div>

                <div class="mb-6">
                  <label for="budget" class="contact-label">
                    {{ copy().fields.budget }}
                  </label>
                  <select id="budget" formControlName="budget" class="input">
                    <option value="">{{ copy().selectOption }}</option>
                    @for (budget of copy().budgetOptions; track budget.value) {
                      <option [value]="budget.value">{{ budget.label }}</option>
                    }
                  </select>
                </div>

                <div class="mb-6">
                  <label for="message" class="contact-label">
                    {{ copy().fields.message }} <span class="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    formControlName="message"
                    rows="5"
                    class="input resize-none"
                    [ngClass]="{'border-red-500': isFieldInvalid('message')}"
                    [placeholder]="copy().placeholders.message"
                  ></textarea>
                  @if (isFieldInvalid('message')) {
                    <p class="mt-1 text-sm text-red-600">{{ copy().errors.message }}</p>
                  }
                </div>

                @if (submissionFailed()) {
                  <div
                    class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
                    role="alert"
                    aria-live="assertive"
                  >
                    <p class="font-semibold">{{ copy().submissionErrorTitle }}</p>
                    <p class="mt-1 leading-relaxed">{{ copy().submissionErrorDescription }}</p>
                    <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-semibold">
                      <a
                        [href]="'mailto:' + contactEmail"
                        class="underline decoration-red-300 underline-offset-4 hover:decoration-red-600"
                      >
                        {{ contactEmail }}
                      </a>
                      <a
                        [href]="whatsappUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline decoration-red-300 underline-offset-4 hover:decoration-red-600"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                }

                <div class="contact-form__actions">
                  <button
                    type="submit"
                    class="btn-primary flex-1"
                    [disabled]="loading()"
                    [attr.aria-disabled]="loading()"
                  >
                    @if (loading()) {
                      <svg class="-ml-1 mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {{ copy().sending }}
                    } @else {
                      {{ copy().submit }}
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    }
                  </button>
                  <a
                    [href]="whatsappUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-outline"
                  >
                    {{ copy().whatsappDirectCta }}
                  </a>
                </div>
              </form>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: `
    :host{display:block}.contact-page{background:#fff}.contact-head{padding-block:clamp(3rem,6vw,5rem);border-bottom:1px solid #c7d3dd;background:#fff}.contact-head__eyebrow{color:#0067b8;font-size:.76rem;font-weight:800;text-transform:uppercase;letter-spacing:.13em}.contact-head h1{max-width:15ch;margin-top:.65rem;color:#1c2a3c;font-size:clamp(3rem,6vw,5.4rem);letter-spacing:-.035em;line-height:.94}.contact-head__lead{max-width:48rem;margin-top:1.35rem;color:#526274;font-size:clamp(1.05rem,1.8vw,1.2rem);line-height:1.7}.contact-body{padding-block:clamp(3.5rem,7vw,6rem);background:#f4f7f9}.contact-body__grid{display:grid;grid-template-columns:minmax(19rem,.85fr) minmax(0,1.15fr);gap:clamp(2.5rem,5vw,4.5rem);align-items:start}.contact-aside{display:grid;gap:2rem}.whatsapp-box{padding:1.75rem;background:#1c2a3c;border-radius:1rem;color:#fff}.whatsapp-box__badge{display:inline-block;color:#8bd1ff;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.12em}.whatsapp-box h2{margin-top:.55rem;color:#fff;font-size:1.75rem;line-height:1.08}.whatsapp-box p{margin-top:.75rem;color:#d7e2ec;font-size:.96rem;line-height:1.65}.whatsapp-box__btn{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;width:100%;min-height:2.9rem;margin-top:1.35rem;padding:.75rem 1.25rem;border-radius:9999px;background:#00965f;color:#fff;font-weight:700;transition:background 180ms ease}.whatsapp-box__btn:hover{background:#007d4f}.contact-details{padding-top:1.5rem;border-top:2px solid #1c2a3c}.contact-details h2{color:#1c2a3c;font-size:1.45rem}.contact-details dl{display:grid;gap:1.1rem;margin-top:1.1rem}.contact-details dt{color:#1c2a3c;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em}.contact-details dd{margin-top:.2rem;color:#526274;font-size:.98rem}.contact-details a{color:#0067b8;font-weight:600;text-decoration:underline;text-underline-offset:.25em}.contact-socials{padding-top:1.25rem;border-top:1px solid #c7d3dd}.contact-socials h3{color:#1c2a3c;font-size:.82rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em}.contact-socials__list{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:.85rem}.contact-socials__list a{display:grid;place-items:center;width:2.5rem;height:2.5rem;border:1px solid #c7d3dd;border-radius:.65rem;background:#fff;color:#1c2a3c;transition:border-color 180ms ease,color 180ms ease}.contact-socials__list a:hover{border-color:#0067b8;color:#0067b8}.contact-form-panel{padding:clamp(1.5rem,4vw,2.5rem);background:#fff;border:1px solid #c7d3dd;border-radius:1rem}.contact-label{display:block;margin-bottom:.45rem;color:#1c2a3c;font-size:.86rem;font-weight:700}.contact-form__actions{display:flex;flex-wrap:wrap;gap:.85rem;align-items:center}@media(max-width:920px){.contact-body__grid{grid-template-columns:1fr}}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly locale = inject(LocaleService);
  private readonly contactService = inject(ContactService);
  private readonly route = inject(ActivatedRoute, { optional: true });

  readonly loading = signal(false);
  readonly submitted = signal(false);
  readonly submissionFailed = signal(false);
  readonly language = this.locale.language;
  readonly contactEmail = siteConfig.contact.email;
  readonly whatsappUrl = siteConfig.contact.whatsappUrl;

  readonly contactForm: FormGroup<ContactFormControls> = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    service: [''],
    budget: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    botcheck: [false],
  });

  readonly socials = SOCIAL_LINKS;
  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          eyebrow: 'Contact',
          title: "Let's talk about your project or system",
          description: 'Whether you want to leave an unmanageable Excel behind, build a website or modernize a legacy system, we reply within 24 business hours.',
          whatsappBadge: 'Direct contact with Oscar',
          whatsappBoxTitle: 'Prefer to send a WhatsApp message or audio?',
          whatsappBoxText: 'No need to fill out the form if you want to talk right now. Click below to open WhatsApp with a pre-filled message.',
          whatsappDirectCta: 'Talk on WhatsApp',
          contactInfoTitle: 'Contact information',
          locationLabel: 'Location',
          socialTitle: 'Follow us',
          successTitle: 'Message sent!',
          successDescription: 'We received your enquiry. We will reply within the next 24 business hours.',
          sendAnother: 'Send another message',
          sending: 'Sending...',
          submit: 'Send message',
          submissionErrorTitle: 'We could not send your message.',
          submissionErrorDescription:
            'Your information is still in the form. Please try again or contact us directly:',
          selectOption: 'Select...',
          fields: {
            name: 'Full name',
            email: 'Email',
            company: 'Company',
            service: 'Service of interest',
            budget: 'Estimated budget',
            message: 'Message',
          },
          placeholders: {
            name: 'Your name',
            email: 'you@email.com',
            company: 'Your company name',
            message: 'Tell us about your project...',
          },
          errors: {
            name: 'Name is required',
            email: 'Please enter a valid email address',
            message: 'Message is required (minimum 10 characters)',
          },
          serviceOptions: [
            { value: 'modernizacion', label: 'Legacy system modernization' },
            { value: 'excel-a-sistema', label: 'From Excel / spreadsheets to a web system' },
            { value: 'landing-page', label: 'Landing Page' },
            { value: 'ecommerce', label: 'E-commerce' },
            { value: 'desarrollo-medida', label: 'Custom Development' },
            { value: 'consultoria', label: 'Consulting' },
            { value: 'otro', label: 'Other' },
          ],
          budgetOptions: [
            { value: 'a-definir', label: 'To be defined / Quote by stages' },
            { value: 'hasta-1000', label: 'Up to USD 1,000 (website / first stage)' },
            { value: '1000-5000', label: 'USD 1,000 - 5,000' },
            { value: '5000-10000', label: 'USD 5,000 - 10,000' },
            { value: 'mas-10000', label: 'More than USD 10,000' },
          ],
        }
      : {
          eyebrow: 'Contacto',
          title: 'Hablemos de tu proyecto o tu sistema',
          description: 'Ya sea para salir de un Excel que quedó chico, crear una web comercial o modernizar un sistema de gestión, respondemos en 24 horas hábiles.',
          whatsappBadge: 'Contacto directo con Oscar',
          whatsappBoxTitle: '¿Preferís mandar un mensaje o un audio por WhatsApp?',
          whatsappBoxText: 'Muchos dueños de negocios prefieren hablar directo sin llenar formularios. Tocá el botón y se abre el chat con un mensaje listo para enviar.',
          whatsappDirectCta: 'Hablar por WhatsApp',
          contactInfoTitle: 'Información de contacto',
          locationLabel: 'Ubicación',
          socialTitle: 'Seguinos en redes',
          successTitle: '¡Mensaje enviado!',
          successDescription: 'Recibimos tu consulta. Te respondemos dentro de las próximas 24 horas hábiles.',
          sendAnother: 'Enviar otro mensaje',
          sending: 'Enviando...',
          submit: 'Enviar mensaje',
          submissionErrorTitle: 'No pudimos enviar tu consulta.',
          submissionErrorDescription:
            'Tus datos siguen en el formulario. Intentá nuevamente o contactanos directamente:',
          selectOption: 'Seleccionar...',
          fields: {
            name: 'Nombre completo',
            email: 'Email',
            company: 'Empresa',
            service: 'Servicio de interés',
            budget: 'Presupuesto estimado',
            message: 'Mensaje',
          },
          placeholders: {
            name: 'Tu nombre',
            email: 'tu@email.com',
            company: 'Nombre de tu empresa',
            message: 'Contanos sobre tu proyecto...',
          },
          errors: {
            name: 'El nombre es requerido',
            email: 'Ingresá un email válido',
            message: 'El mensaje es requerido (mínimo 10 caracteres)',
          },
          serviceOptions: [
            { value: 'modernizacion', label: 'Modernización de sistema existente' },
            { value: 'excel-a-sistema', label: 'Pasar de Excel / planillas a sistema web' },
            { value: 'landing-page', label: 'Landing Page' },
            { value: 'ecommerce', label: 'E-commerce' },
            { value: 'desarrollo-medida', label: 'Desarrollo a Medida' },
            { value: 'consultoria', label: 'Consultoría' },
            { value: 'otro', label: 'Otro' },
          ],
          budgetOptions: [
            { value: 'a-definir', label: 'A definir / Cotizar por etapas' },
            { value: 'hasta-1000', label: 'Hasta USD 1.000 (sitio web / primera etapa)' },
            { value: '1000-5000', label: 'USD 1.000 - 5.000' },
            { value: '5000-10000', label: 'USD 5.000 - 10.000' },
            { value: 'mas-10000', label: 'Más de USD 10.000' },
          ],
        }
  ));

  ngOnInit(): void {
    const serviceParam = this.route?.snapshot?.queryParamMap?.get('servicio');
    if (serviceParam) {
      if (serviceParam === 'modernizacion' || serviceParam === 'modernizacion-sistemas-legacy') {
        this.contactForm.patchValue({ service: 'modernizacion' });
      } else if (serviceParam === 'excel-a-sistema') {
        this.contactForm.patchValue({ service: 'excel-a-sistema' });
      } else if (['landing-pages', 'landing-page'].includes(serviceParam)) {
        this.contactForm.patchValue({ service: 'landing-page' });
      } else if (['ecommerce'].includes(serviceParam)) {
        this.contactForm.patchValue({ service: 'ecommerce' });
      } else if (['desarrollo-medida', 'desarrollo-a-medida'].includes(serviceParam)) {
        this.contactForm.patchValue({ service: 'desarrollo-medida' });
      } else if (['consultoria', 'diagnostico-continuidad', 'facturacion-arca', 'datos-seguros'].includes(serviceParam)) {
        this.contactForm.patchValue({ service: 'consultoria' });
      } else if (['sitios-tiendas'].includes(serviceParam)) {
        this.contactForm.patchValue({ service: 'landing-page' });
      }
    }
  }

  getSocialIconPath(platform: string): string {
    const iconPaths: Record<string, string> = {
      instagram:
        'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      tiktok:
        'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
      facebook:
        'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      linkedin:
        'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
      github:
        'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
      twitter:
        'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    };

    return iconPaths[platform] ?? iconPaths['github'];
  }

  isFieldInvalid(fieldName: keyof ContactFormControls): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.loading()) {
      return;
    }

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.submissionFailed.set(false);

    try {
      await firstValueFrom(this.contactService.submit(this.buildSubmission()));
      this.submitted.set(true);
    } catch {
      this.submissionFailed.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted.set(false);
    this.submissionFailed.set(false);
  }

  private buildSubmission(): ContactSubmission {
    const formValue = this.contactForm.getRawValue();

    return {
      ...formValue,
      service: this.getOptionLabel(this.copy().serviceOptions, formValue.service),
      budget: this.getOptionLabel(this.copy().budgetOptions, formValue.budget),
    };
  }

  private getOptionLabel(options: { value: string; label: string }[], value: string): string {
    return options.find((option) => option.value === value)?.label ?? '';
  }
}
