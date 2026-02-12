import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, from, map, of } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatApiResponse {
  response: string;
}

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);

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
    content:
      'Hola! Soy el asistente de DevMenteStudio. En que puedo ayudarte hoy? Puedo contarte sobre nuestros servicios, tecnologias o como contactarnos.',
    timestamp: new Date(),
  };

  constructor() {
    this.initializeChat();
  }

  private initializeChat(): void {
    this._messages.set([this.welcomeMessage]);
  }

  /**
   * Envia un mensaje al chatbot
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

    this._messages.update((msgs) => [...msgs, userChatMessage]);
    this._isLoading.set(true);
    this._error.set(null);

    return from(this.processMessage(userMessage)).pipe(
      map((response) => {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };

        this._messages.update((msgs) => [...msgs, assistantMessage]);
        this._isLoading.set(false);
        return response;
      }),
      catchError(() => {
        const errorMsg =
          'Hubo un error al procesar tu mensaje. Contactanos en contacto@devmentestudio.com';
        this._error.set(errorMsg);
        this._isLoading.set(false);

        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: errorMsg,
          timestamp: new Date(),
        };

        this._messages.update((msgs) => [...msgs, errorMessage]);
        return of(errorMsg);
      }),
    );
  }

  private async processMessage(msg: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<ChatApiResponse>('/api/chat', { message: msg }),
      );

      if (response?.response?.trim()) {
        return response.response;
      }

      return this.localFallback(msg);
    } catch {
      return this.localFallback(msg);
    }
  }

  private localFallback(msg: string): string {
    const lowerMsg = msg.toLowerCase();

    if (lowerMsg.includes('servicios') || lowerMsg.includes('hacen')) {
      return 'Ofrecemos Landing Pages, E-commerce, Desarrollo a Medida y Consultoria. Te interesa alguno en particular?';
    }

    if (lowerMsg.includes('precio') || lowerMsg.includes('costo')) {
      return 'Para presupuestos personalizados, por favor contactanos a traves de nuestro formulario en /contacto o escribinos a contacto@devmentestudio.com.';
    }

    if (lowerMsg.includes('stack') || lowerMsg.includes('tecnologias')) {
      return 'Trabajamos principalmente con Angular, .NET Core, Node.js y Azure.';
    }

    if (lowerMsg.includes('contacto') || lowerMsg.includes('mail')) {
      return 'Podes escribirnos a contacto@devmentestudio.com o visitarnos en Salta, Argentina.';
    }

    return 'Ups! Estoy recibiendo muchas consultas ahora. Mientras me recupero, podes preguntarme por Servicios, Precios o Contacto y te respondo con mi base local.';
  }

  /**
   * Limpia el historial de chat
   */
  clearChat(): void {
    this.initializeChat();
  }
}
