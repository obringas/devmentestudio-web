import {
  Component,
  signal,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { SOCIAL_LINKS } from '../../data/navigation.data';

type ContactFormControls = {
  name: FormControl<string>;
  email: FormControl<string>;
  company: FormControl<string>;
  service: FormControl<string>;
  budget: FormControl<string>;
  message: FormControl<string>;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="min-h-screen">
      <!-- Hero -->
      <section class="py-24 lg:py-32 relative overflow-hidden">
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div class="container-custom">
          <div class="max-w-3xl">
            <span class="text-primary-400 font-medium mb-4 block">Contacto</span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-surface-100 mb-6">
              Hablemos de tu proyecto
            </h1>
            <p class="text-surface-400 text-lg">
              Contanos tu idea y te ayudamos a hacerla realidad. 
              Respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-16 lg:py-24">
        <div class="container-custom">
          <div class="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <!-- Contact Info -->
            <div class="lg:col-span-2">
              <h2 class="text-2xl font-display font-bold text-surface-100 mb-8">
                Información de contacto
              </h2>

              <div class="space-y-6 mb-12">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-surface-200 mb-1">Email</h3>
                    <a href="mailto:contacto@devmentestudio.com" class="text-surface-400 hover:text-primary-400 transition-colors">
                      contacto&#64;devmentestudio.com
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-surface-200 mb-1">Ubicación</h3>
                    <p class="text-surface-400">Salta, Argentina</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-medium text-surface-200 mb-1">WhatsApp</h3>
                    <a href="https://wa.me/5493874513777" target="_blank" rel="noopener noreferrer" class="text-surface-400 hover:text-green-400 transition-colors">
                      +54 9 387 451-3777
                    </a>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div>
                <h3 class="font-medium text-surface-200 mb-4">Seguinos en redes</h3>
                <div class="flex gap-4">
                  @for (social of socials; track social.label) {
                    <a 
                      [href]="social.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-10 h-10 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:bg-surface-700 hover:text-primary-400 transition-all"
                      [attr.aria-label]="social.label"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path [attr.d]="getSocialIconPath(social.platform)"></path>
                      </svg>
                    </a>
                  }
                </div>
              </div>
            </div>

            <!-- Contact Form -->
            <div class="lg:col-span-3">
              <div class="p-8 rounded-2xl bg-surface-900/50 border border-surface-800">
                @if (submitted()) {
                  <div class="text-center py-12">
                    <div class="w-16 h-16 rounded-full bg-accent-500/20 flex items-center justify-center mx-auto mb-6">
                      <svg class="w-8 h-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <h3 class="text-xl font-display font-bold text-surface-100 mb-2">
                      ¡Mensaje enviado!
                    </h3>
                    <p class="text-surface-400 mb-6">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                    <button 
                      type="button" 
                      class="btn-secondary"
                      (click)="resetForm()"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                } @else {
                  <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                    <div class="grid sm:grid-cols-2 gap-6 mb-6">
                      <!-- Name -->
                      <div>
                        <label for="name" class="block text-sm font-medium text-surface-300 mb-2">
                          Nombre completo <span class="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          formControlName="name"
                          class="input"
                          [ngClass]="{'border-red-500': isFieldInvalid('name')}"
                          placeholder="Tu nombre"
                        />
                        @if (isFieldInvalid('name')) {
                          <p class="mt-1 text-sm text-red-400">El nombre es requerido</p>
                        }
                      </div>

                      <!-- Email -->
                      <div>
                        <label for="email" class="block text-sm font-medium text-surface-300 mb-2">
                          Email <span class="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          formControlName="email"
                          class="input"
                          [ngClass]="{'border-red-500': isFieldInvalid('email')}"
                          placeholder="tu@email.com"
                        />
                        @if (isFieldInvalid('email')) {
                          <p class="mt-1 text-sm text-red-400">Ingresá un email válido</p>
                        }
                      </div>
                    </div>

                    <div class="grid sm:grid-cols-2 gap-6 mb-6">
                      <!-- Company -->
                      <div>
                        <label for="company" class="block text-sm font-medium text-surface-300 mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="company"
                          formControlName="company"
                          class="input"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>

                      <!-- Service -->
                      <div>
                        <label for="service" class="block text-sm font-medium text-surface-300 mb-2">
                          Servicio de interés
                        </label>
                        <select
                          id="service"
                          formControlName="service"
                          class="input"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="landing-page">Landing Page</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="desarrollo-medida">Desarrollo a Medida</option>
                          <option value="consultoria">Consultoría</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <!-- Budget -->
                    <div class="mb-6">
                      <label for="budget" class="block text-sm font-medium text-surface-300 mb-2">
                        Presupuesto estimado
                      </label>
                      <select
                        id="budget"
                        formControlName="budget"
                        class="input"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="menos-500">Menos de USD 500</option>
                        <option value="500-1000">USD 500 - 1.000</option>
                        <option value="1000-5000">USD 1.000 - 5.000</option>
                        <option value="5000-10000">USD 5.000 - 10.000</option>
                        <option value="mas-10000">Más de USD 10.000</option>
                      </select>
                    </div>

                    <!-- Message -->
                    <div class="mb-6">
                      <label for="message" class="block text-sm font-medium text-surface-300 mb-2">
                        Mensaje <span class="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        formControlName="message"
                        rows="5"
                        class="input resize-none"
                        [ngClass]="{'border-red-500': isFieldInvalid('message')}"
                        placeholder="Contanos sobre tu proyecto..."
                      ></textarea>
                      @if (isFieldInvalid('message')) {
                        <p class="mt-1 text-sm text-red-400">El mensaje es requerido (mínimo 10 caracteres)</p>
                      }
                    </div>

                    <!-- Submit -->
                    <button
                      type="submit"
                      class="btn-primary w-full"
                      [disabled]="loading()"
                    >
                      @if (loading()) {
                        <svg class="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      } @else {
                        Enviar mensaje
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      }
                    </button>
                  </form>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(false);
  readonly submitted = signal(false);

  readonly contactForm: FormGroup<ContactFormControls> = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    service: [''],
    budget: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly socials = SOCIAL_LINKS;

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

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading.set(true);

      // Simulate API call
      setTimeout(() => {
        this.loading.set(false);
        this.submitted.set(true);
      }, 1500);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitted.set(false);
  }
}
