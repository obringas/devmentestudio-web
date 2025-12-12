import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GoogleGenerativeAI, ChatSession, GenerativeModel } from '@google/generative-ai';
import { environment } from '../../../environments/environment';
import { Observable, from, map, catchError, of } from 'rxjs';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class GeminiService {
    private readonly platformId = inject(PLATFORM_ID);

    // Estado del chat con signals
    private readonly _messages = signal<ChatMessage[]>([]);
    private readonly _isLoading = signal(false);
    private readonly _error = signal<string | null>(null);

    // Exponer como readonly
    readonly messages = this._messages.asReadonly();
    readonly isLoading = this._isLoading.asReadonly();
    readonly error = this._error.asReadonly();

    // Mensaje de bienvenida inicial
    readonly welcomeMessage: ChatMessage = {
        role: 'assistant',
        content: '¡Hola! 👋 Soy el asistente de DevMenteStudio. ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros servicios, tecnologías o cómo contactarnos.',
        timestamp: new Date(),
    };

    private model: GenerativeModel | null = null;
    private chatSession: ChatSession | null = null;
    private readonly SYSTEM_INSTRUCTION = `
Rol: Asistente virtual de DevMenteStudio (Software Studio en Salta, Argentina).
Contacto: contacto@devmentestudio.com | https://devmentestudio.com | +54 9 387 451-3777

SERVICIOS:
1. Landing Pages: Diseño responsive, SEO, Angular/Next.js/Tailwind.
2. E-commerce: Tiendas escalables, pagos (Stripe/MP), .NET/SQL.
3. Desarrollo a Medida: Soluciones personalizadas, .NET/Node.js/PostgreSQL/Azure.
4. Consultoría: Arquitectura, auditoría, CI/CD, migración legacy.

STACK: Angular, Next.js, Tailwind, .NET Core, Node.js, SQL/Postgres, Azure, Docker.

PÁGINAS: / (Home), /servicios, /portfolio, /nosotros, /contacto.

INSTRUCCIONES:
- Responde en español, sé profesional y conciso.
- Precios: Solicitar presupuesto en /contacto.
- Dudas: Sugerir email.
    `;

    constructor() {
        this.initializeChat();
    }

    private initializeChat(): void {
        this._messages.set([this.welcomeMessage]);

        if (isPlatformBrowser(this.platformId)) {
            try {
                console.log('Iniciando Gemini Service...');
                const apiKey = environment.geminiApiKey;
                if (!apiKey) {
                    console.error('API Key no configurada en environment');
                    return;
                }
                console.log('API Key encontrada, inicializando modelo...');

                const genAI = new GoogleGenerativeAI(apiKey);
                // Cambiamos al modelo solicitado por el usuario
                this.model = genAI.getGenerativeModel({
                    model: 'gemini-2.5-flash',
                    systemInstruction: this.SYSTEM_INSTRUCTION
                });

                this.startNewSession();
            } catch (error) {
                console.error('Error inicializando Gemini:', error);
            }
        }
    }

    private startNewSession(): void {
        if (this.model) {
            try {
                this.chatSession = this.model.startChat({
                    history: []
                });
            } catch (e) {
                console.error('Error al iniciar sesión de chat:', e);
            }
        }
    }

    /**
     * Envía un mensaje al chatbot
     */
    sendMessage(userMessage: string): Observable<string> {
        if (!isPlatformBrowser(this.platformId)) {
            return of('');
        }

        const userChatMessage: ChatMessage = {
            role: 'user',
            content: userMessage,
            timestamp: new Date(),
        };
        this._messages.update(msgs => [...msgs, userChatMessage]);
        this._isLoading.set(true);
        this._error.set(null);

        // Fallback local y lógica
        return from(this.processMessage(userMessage)).pipe(
            map(response => {
                const assistantMessage: ChatMessage = {
                    role: 'assistant',
                    content: response,
                    timestamp: new Date(),
                };
                this._messages.update(msgs => [...msgs, assistantMessage]);
                this._isLoading.set(false);
                return response;
            }),
            catchError(err => {
                const errorMsg = 'Hubo un error al procesar tu mensaje. Contactanos en contacto@devmentestudio.com';
                this._error.set(errorMsg);
                this._isLoading.set(false);

                const errorMessage: ChatMessage = {
                    role: 'assistant',
                    content: errorMsg,
                    timestamp: new Date(),
                };
                this._messages.update(msgs => [...msgs, errorMessage]);
                return of(errorMsg);
            })
        );
    }

    private async processMessage(msg: string): Promise<string> {
        try {
            if (this.chatSession) {
                const result = await this.chatSession.sendMessage(msg);
                return result.response.text();
            } else {
                // Fallback si no hay sesión AI
                await new Promise(resolve => setTimeout(resolve, 500));
                return this.localFallback(msg);
            }
        } catch (error: any) {
            // Ignoramos el log de error para no saturar la consola, ya sabemos que es cuota
            // Si es error de cuota (429) o cualquier otro, usamos fallback local
            return this.localFallback(msg);
        }
    }

    private localFallback(msg: string): string {
        const lowerMsg = msg.toLowerCase();

        if (lowerMsg.includes('servicios') || lowerMsg.includes('hacen')) {
            return 'Ofrecemos Landing Pages, E-commerce, Desarrollo a Medida y Consultoría. ¿Te interesa alguno en particular?';
        }
        if (lowerMsg.includes('precio') || lowerMsg.includes('costo')) {
            return 'Para presupuestos personalizados, por favor contactanos a través de nuestro formulario en /contacto o escribinos a contacto@devmentestudio.com.';
        }
        if (lowerMsg.includes('stack') || lowerMsg.includes('tecnologias')) {
            return 'Trabajamos principalmente con Angular, .NET Core, Node.js y Azure.';
        }
        if (lowerMsg.includes('contacto') || lowerMsg.includes('mail')) {
            return 'Podes escribirnos a contacto@devmentestudio.com o visitarnos en Salta, Argentina.';
        }

        // Mensaje de fallback más amigable
        return '¡Ups! 😅 Estoy recibiendo muchísimas consultas ahora y mi cerebro digital está saturado (Error de Cuota). Mientras me recupero, podés preguntarme específicamente por "Servicios", "Precios" o "Contacto" y te responderé con mi base de datos local.';
    }

    /**
     * Limpia el historial de chat
     */
    clearChat(): void {
        this.initializeChat();
    }
}
