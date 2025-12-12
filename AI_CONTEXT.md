# DevMenteStudio - Contexto para Desarrollo con IA

> **IMPORTANTE:** Este proyecto debe desarrollarse en **español**. Todas las respuestas, comentarios de código, y documentación deben estar en español.

## 📋 Resumen del Proyecto

**DevMenteStudio** es el sitio web corporativo de un estudio de desarrollo de software ubicado en Salta, Argentina. Ofrece servicios de:

- Landing Pages
- E-commerce
- Desarrollo de Software a Medida
- Consultoría en Arquitectura de Software

**URL de producción:** https://devmentestudio.com (pendiente de deploy)

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Angular | 21+ | Framework principal |
| TypeScript | 5.x | Lenguaje de programación |
| Tailwind CSS | 3.x | Estilos y diseño |
| @angular/ssr | Última | Server-Side Rendering |
| RxJS | 7.x | Programación reactiva |
| Vercel | - | Hosting y deployment |
| @google/generative-ai | Última | Integración con Gemini AI |

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── environments/            # Configuración por ambiente
│   ├── environment.ts      # Desarrollo (API keys, URLs)
│   └── environment.production.ts  # Producción
│
├── app/
│   ├── core/                    # Singleton services, guards, interceptors
│   │   ├── services/           # Servicios globales
│   │   │   └── gemini.service.ts  # 🤖 Servicio de chat con Gemini AI
│   │   └── interceptors/       # HTTP interceptors
│   │
│   ├── shared/                  # Código compartido entre features
│   │   └── components/
│   │       ├── ui/             # Componentes UI reutilizables
│   │       │   ├── button/
│   │       │   ├── card/
│   │       │   ├── badge/
│   │       │   ├── input/
│   │       │   └── chat/       # 🤖 Componente de chat flotante
│   │       └── layout/         # Componentes de estructura
│   │           ├── header/
│   │           ├── footer/
│   │           ├── container/
│   │           └── section/
│   │
│   ├── features/               # Módulos por funcionalidad (lazy loaded)
│   │   ├── home/              # Página principal
│   │   │   └── components/    # Hero, ServicesPreview, TechStack, CTA
│   │   ├── services/          # Listado y detalle de servicios
│   │   ├── portfolio/         # Galería de proyectos
│   │   ├── about/             # Página "Nosotros"
│   │   └── contact/           # Formulario de contacto
│   │
│   ├── models/                 # Interfaces y tipos TypeScript
│   ├── data/                   # Datos estáticos (services, navigation, tech-stack)
│   ├── config/                 # Configuración del sitio
│   │
│   ├── app.ts                  # Componente raíz (incluye ChatComponent)
│   ├── app.routes.ts           # Configuración de rutas
│   ├── app.routes.server.ts    # Configuración SSR
│   ├── app.config.ts           # Providers de la aplicación
│   └── app.config.server.ts    # Providers del servidor
│
└── server.ts                    # 🤖 Endpoint /api/chat con Gemini
```

### Patrón de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                      FEATURES                           │
│  (home, services, portfolio, about, contact)            │
│  - Componentes específicos de cada página               │
│  - Lazy loaded por ruta                                 │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                       SHARED                            │
│  - Componentes UI reutilizables                         │
│  - Componentes de layout                                │
│  - Directivas y pipes compartidos                       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                        CORE                             │
│  - Servicios singleton                                  │
│  - Guards de rutas                                      │
│  - Interceptors HTTP                                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   MODELS / DATA                         │
│  - Interfaces TypeScript                                │
│  - Datos estáticos                                      │
│  - Configuración                                        │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Buenas Prácticas OBLIGATORIAS

### 1. Componentes

```typescript
// ✅ CORRECTO - Standalone component con OnPush
@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiComponenteComponent {
  // Usar inject() en lugar de constructor
  private readonly servicio = inject(MiServicio);
  
  // Usar signals para estado
  readonly datos = signal<Dato[]>([]);
  readonly loading = signal(false);
  
  // Usar computed para valores derivados
  readonly totalItems = computed(() => this.datos().length);
  
  // Usar input() para inputs
  readonly titulo = input<string>('');
  readonly items = input.required<Item[]>();
  
  // Usar output() para outputs
  readonly itemSeleccionado = output<Item>();
}
```

```typescript
// ❌ INCORRECTO - NO hacer esto
@Component({...})
export class MiComponenteComponent {
  // NO usar constructor injection
  constructor(private servicio: MiServicio) {}
  
  // NO usar variables mutables
  datos: Dato[] = [];
  
  // NO usar @Input/@Output decorators
  @Input() titulo: string;
  @Output() click = new EventEmitter();
}
```

### 2. Signals y Estado

```typescript
// ✅ CORRECTO - Signals para estado reactivo
readonly usuarios = signal<Usuario[]>([]);
readonly usuarioSeleccionado = signal<Usuario | null>(null);
readonly filtro = signal('');

// Computed para valores derivados
readonly usuariosFiltrados = computed(() => 
  this.usuarios().filter(u => 
    u.nombre.toLowerCase().includes(this.filtro().toLowerCase())
  )
);

// Actualizar estado
this.usuarios.set(nuevosUsuarios);
this.usuarios.update(prev => [...prev, nuevoUsuario]);
```

```typescript
// ❌ INCORRECTO - NO usar BehaviorSubject para estado simple
private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
usuarios$ = this.usuariosSubject.asObservable();
```

### 3. Templates con Nuevo Control Flow

```html
<!-- ✅ CORRECTO - Nuevo control flow de Angular 17+ -->
@if (loading()) {
  <app-skeleton />
} @else if (error()) {
  <p class="text-red-500">{{ error() }}</p>
} @else {
  @for (item of items(); track item.id) {
    <app-card [data]="item" />
  } @empty {
    <p>No hay elementos</p>
  }
}

@switch (estado()) {
  @case ('pendiente') { <span class="badge">Pendiente</span> }
  @case ('activo') { <span class="badge-accent">Activo</span> }
  @default { <span>Desconocido</span> }
}

<!-- Lazy loading con @defer -->
@defer (on viewport) {
  <app-componente-pesado />
} @placeholder {
  <app-skeleton />
} @loading (minimum 500ms) {
  <app-spinner />
}
```

```html
<!-- ❌ INCORRECTO - NO usar directivas estructurales antiguas -->
<div *ngIf="loading">...</div>
<div *ngFor="let item of items">...</div>
<div [ngSwitch]="estado">...</div>
```

### 4. Formularios Reactivos Tipados

```typescript
// ✅ CORRECTO - FormGroup tipado
interface ContactoForm {
  nombre: string;
  email: string;
  mensaje: string;
}

readonly contactForm = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  mensaje: ['', [Validators.required, Validators.minLength(10)]],
});

// Acceso tipado
const nombre = this.contactForm.value.nombre; // string | undefined
```

### 5. Servicios

```typescript
// ✅ CORRECTO - Servicio con inject y signals
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(API_URL);
  
  // Estado interno con signals
  private readonly _usuarios = signal<Usuario[]>([]);
  readonly usuarios = this._usuarios.asReadonly();
  
  cargarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`).pipe(
      tap(usuarios => this._usuarios.set(usuarios)),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    return throwError(() => new Error('Error al cargar datos'));
  }
}
```

### 6. Estilos con Tailwind

```html
<!-- ✅ CORRECTO - Usar clases de Tailwind definidas en el proyecto -->
<button class="btn-primary">Primario</button>
<button class="btn-secondary">Secundario</button>
<button class="btn-ghost">Ghost</button>
<button class="btn-outline">Outline</button>

<div class="card">Contenido</div>
<div class="card-interactive">Clickeable</div>
<div class="glass">Efecto glass</div>

<span class="badge">Primary</span>
<span class="badge-accent">Accent</span>

<span class="text-gradient">Texto con gradiente</span>

<input class="input" placeholder="Input estilizado" />
```

```html
<!-- ❌ INCORRECTO - NO crear estilos inline complejos -->
<button style="background: linear-gradient(...)">...</button>
```

---

## 🚫 Restricciones Estrictas

| ❌ NO Hacer | ✅ Hacer en su lugar |
|------------|---------------------|
| Usar `any` | Tipar correctamente |
| Usar NgModules | Standalone components |
| Usar `*ngIf`, `*ngFor` | `@if`, `@for`, `@switch` |
| Constructor injection | `inject()` function |
| `@Input()`, `@Output()` | `input()`, `output()` |
| `subscribe()` manual | `async` pipe o `toSignal()` |
| Default ChangeDetection | `OnPush` siempre |
| Componentes > 150 líneas | Dividir en componentes más pequeños |
| Más de 3 niveles de anidación | Extraer a componentes |
| Lógica compleja en templates | Usar `computed()` signals |
| `console.log` en producción | Remover o usar logger service |
| CSS inline extenso | Tailwind classes |

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```
Primary (Índigo):
- primary-50 a primary-950
- Uso: CTAs, enlaces, elementos destacados

Accent (Esmeralda):
- accent-50 a accent-950
- Uso: Badges de éxito, elementos secundarios

Surface (Zinc):
- surface-50 a surface-950
- Uso: Fondos, bordes, texto
- surface-950 = fondo principal (tema oscuro)
- surface-100 = texto principal
- surface-400 = texto secundario
```

### Tipografía

```
font-display: 'Space Grotesk' - Títulos y headings
font-sans: 'Outfit' - Texto de cuerpo
font-mono: 'JetBrains Mono' - Código
```

### Componentes de Clases Disponibles

```css
/* Botones */
.btn-primary    /* Botón principal con glow */
.btn-secondary  /* Botón secundario */
.btn-ghost      /* Botón transparente */
.btn-outline    /* Botón con borde */

/* Cards */
.card              /* Card básica */
.card-interactive  /* Card con hover effects */
.glass             /* Efecto glassmorphism */

/* Badges */
.badge        /* Badge primary */
.badge-accent /* Badge accent */

/* Inputs */
.input  /* Input estilizado */

/* Layout */
.container-custom  /* Container con max-width y padding */
.section          /* Sección con padding vertical */

/* Utilidades */
.text-gradient  /* Texto con gradiente primary->accent */
.divider        /* Línea divisoria con gradiente */
```

---

## 📄 Páginas y Funcionalidades Actuales

### 1. Home (`/`)
- **Hero Section:** Título animado, badge de disponibilidad, CTAs, stats, bloque de código decorativo
- **Services Preview:** Grid 2x2 de servicios con iconos y tecnologías
- **Tech Stack:** Scroll infinito horizontal con tecnologías
- **CTA Section:** Llamada a la acción con gradientes

### 2. Servicios (`/servicios`)
- **Lista:** Cards de servicios con features y tecnologías
- **Detalle (`/servicios/:slug`):** Página completa del servicio con features, beneficios, tecnologías y CTA

### 3. Portfolio (`/portfolio`)
- **Estado:** Placeholder "Próximamente"
- **Pendiente:** Grid de proyectos con filtros, detalle de proyecto

### 4. Nosotros (`/nosotros`)
- Historia de la empresa
- Valores (Calidad, Cercanía, Resultados)
- Stack tecnológico principal

### 5. Contacto (`/contacto`)
- **Formulario:** Nombre, email, empresa, servicio, presupuesto, mensaje
- **Validaciones:** Reactive forms con mensajes de error
- **Estado de envío:** Loading spinner y confirmación
- **Info de contacto:** Email, ubicación, WhatsApp, redes sociales

### 6. Chat de IA (Global)
- **Chatbot flotante:** Botón en esquina inferior derecha disponible en todas las páginas
- **Asistente virtual:** Responde preguntas sobre servicios, tecnologías y contacto
- **Modelo:** Gemini 2.0 Flash Experimental
- **Contexto:** Información completa del sitio (servicios, tecnologías, contacto)

---

## 🤖 Integración con Gemini AI (Cliente-Side)

### Arquitectura

```
Cliente (GeminiService)
        │
        ▼
   Directo a Gemini API (generativelanguage.googleapis.com)
   (Modelo: gemini-2.5-flash / gemini-2.0-flash-exp)
```

### Archivos Principales

| Archivo | Propósito |
|---------|----------|
| `src/app/core/services/gemini.service.ts` | Servicio principal. Maneja lógica de chat y Fallback. |
| `src/app/shared/components/ui/chat/` | Interfaz de usuario (Chatbot UI). |
| `src/environments/environment.ts` | Configuración de API Key (Desarrollo). |

### Estrategia de Fallback (Modo Offline)

Debido a límites de cuota (Error 429), se implementó un sistema híbrido:
1. **Intento AI:** Se conecta a Gemini.
2. **Fallo:** Si da error (429/404), captura la excepción.
3. **Respuesta Local:** Responde automáticamente a palabras clave ("Precios", "Servicios", "Contacto") sin usar la API.

Datos de Contacto Actualizados:
- **Email:** contacto@devmentestudio.com
- **Teléfono:** +54 9 387 451-3777
- **Redes:** Instagram, TikTok, Facebook, LinkedIn, GitHub, Twitter

### Uso del Servicio

```typescript
// Inyectar servicio
private readonly geminiService = inject(GeminiService);

// Enviar mensaje (Retorna Observable<string>)
this.geminiService.sendMessage('Hola').subscribe();
```

---

## � Cambios Recientes (Refactorización)

### 1. Componentes Layout (Header/Footer)
Se han separado los componentes `HeaderComponent` y `FooterComponent` siguiendo las mejores prácticas de Angular:
- Lógica: `*.component.ts`
- Template: `*.component.html`
- Estilos: `*.component.scss`

### 2. Iconos y Redes Sociales
- **Centralización:** Todos los enlaces y SVGs de redes sociales están centralizados en `src/app/data/navigation.data.ts` (`SOCIAL_LINKS`).
- **Seguridad:** Se utiliza `DomSanitizer` (`bypassSecurityTrustHtml`) para renderizar los iconos SVG de forma segura.
- **Consistencia:** Tanto el Footer como la página de Contacto consumen la misma constante para garantizar uniformidad.

### 3. Branding
- Actualizado el logo a `logo.png`.
- Unificada la paleta de colores en Tailwind config.

---

## 🔗 Referencias

- [Angular Docs](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Angular](https://vercel.com/docs/frameworks/angular)

---

*Última actualización: Diciembre 2024*

### Rutas de Cliente (`app.routes.ts`)
```typescript
{
  path: '',              // Home
  path: 'servicios',     // Lista de servicios
  path: 'servicios/:slug', // Detalle de servicio
  path: 'portfolio',     // Lista de portfolio
  path: 'portfolio/:slug', // Detalle de proyecto
  path: 'nosotros',      // Página about
  path: 'contacto',      // Formulario de contacto
  path: '**',            // Redirect a home
}
```

### Rutas de Servidor (`app.routes.server.ts`)
```typescript
// Prerender (estáticas)
'', 'servicios', 'portfolio', 'nosotros', 'contacto'

// SSR (dinámicas)
'servicios/:slug', 'portfolio/:slug'
```

---

## 📁 Archivos de Datos

### `data/services.data.ts`
Contiene array `SERVICES` con:
- id, slug, title, shortDescription, fullDescription
- icon, features[], technologies[], benefits[]
- cta { text, href }

### `data/navigation.data.ts`
- `MAIN_NAV`: Items del menú principal
- `FOOTER_SECTIONS`: Secciones del footer
- `SOCIAL_LINKS`: Redes sociales

### `data/tech-stack.data.ts`
- `TECH_STACK`: Tecnologías con nombre, categoría, icono, color

### `config/site.config.ts`
- Nombre del sitio, descripción, URLs
- Info de contacto
- Configuración SEO

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm start                 # Servidor en localhost:4200

# Build
npm run build            # Build de producción con SSR

# Otros
ng generate component features/nueva-feature/nueva-feature --standalone
ng generate service core/services/nombre-servicio
```

---

## 📝 Tareas Pendientes

1. [ ] **Portfolio:** Implementar grid de proyectos con datos reales
2. [ ] **Blog:** Crear sección de blog (posiblemente con CMS headless)
3. [ ] **SEO:** Agregar meta tags dinámicos por página
4. [ ] **Analytics:** Integrar Google Analytics o Plausible
5. [ ] **Formulario:** Conectar con backend real (API o servicio como Formspree)
6. [ ] **Imágenes:** Agregar imágenes optimizadas y favicon personalizado
7. [ ] **Testing:** Agregar tests unitarios y e2e
8. [ ] **i18n:** Preparar para internacionalización si se necesita
9. [ ] **PWA:** Considerar agregar service worker
10. [ ] **Accesibilidad:** Auditar y mejorar a11y

### ✅ Completadas

- [x] **Chatbot IA:** Integración con Gemini API para asistente virtual

---

## 💡 Tips para la IA

1. **Siempre responder en español**
2. **Mantener consistencia** con el código existente
3. **Usar signals** para cualquier estado nuevo
4. **Componentes pequeños** y con responsabilidad única
5. **Tipar todo** - evitar `any` a toda costa
6. **Tailwind primero** - usar las clases definidas antes de crear nuevas
7. **OnPush siempre** - nunca usar Default change detection
8. **Lazy loading** - nuevas features deben ser lazy loaded
9. **Documentar** - comentarios en español cuando sea necesario
10. **Seguir la estructura** - respetar la organización de carpetas

---

## 🔗 Referencias

- [Angular Docs](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Angular](https://vercel.com/docs/frameworks/angular)

---

*Última actualización: Diciembre 2024*
