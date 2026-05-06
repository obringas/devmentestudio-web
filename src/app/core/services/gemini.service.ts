import { Injectable, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, from, map, of } from 'rxjs';
import { AppLanguage, LocaleService } from './locale.service';

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
  private readonly locale = inject(LocaleService);

  private readonly _messages = signal<ChatMessage[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly messages = this._messages.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor() {
    this.initializeChat();
  }

  private initializeChat(): void {
    this._messages.set([this.createWelcomeMessage()]);
  }

  private createWelcomeMessage(): ChatMessage {
    return {
      role: 'assistant',
      content:
        this.locale.language() === 'en'
          ? 'Hi! I am the DevMenteStudio assistant. I can tell you about our services, technologies or how to contact us.'
          : 'Hola! Soy el asistente de DevMenteStudio. Puedo contarte sobre nuestros servicios, tecnologias o como contactarnos.',
      timestamp: new Date(),
    };
  }

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
        const errorMsg = this.getErrorMessage(this.locale.language());
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

      return this.localFallback(msg, this.locale.language());
    } catch {
      return this.localFallback(msg, this.locale.language());
    }
  }

  private localFallback(msg: string, language: AppLanguage): string {
    const lowerMsg = msg.toLowerCase();
    const asksAboutServices = lowerMsg.includes('service') || lowerMsg.includes('servicios') || lowerMsg.includes('hacen') || lowerMsg.includes('do you do');
    const asksAboutPrice = lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('precio') || lowerMsg.includes('costo');
    const asksAboutStack = lowerMsg.includes('stack') || lowerMsg.includes('technolog') || lowerMsg.includes('tecnolog');
    const asksAboutContact = lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('contacto') || lowerMsg.includes('mail');

    if (language === 'en') {
      if (asksAboutServices) {
        return 'We offer Landing Pages, E-commerce, Custom Development and Consulting. Do you want details about one of them?';
      }

      if (asksAboutPrice) {
        return 'For a tailored quote, please contact us through /contacto or email contacto@devmentestudio.com.';
      }

      if (asksAboutStack) {
        return 'We mainly work with Angular, .NET Core, Node.js and Azure.';
      }

      if (asksAboutContact) {
        return 'You can email us at contacto@devmentestudio.com or reach us from Salta, Argentina.';
      }

      return 'I am handling a lot of requests right now. In the meantime, ask me about services, pricing or contact details and I will answer from my local knowledge base.';
    }

    if (asksAboutServices) {
      return 'Ofrecemos Landing Pages, E-commerce, Desarrollo a Medida y Consultoria. Te interesa alguno en particular?';
    }

    if (asksAboutPrice) {
      return 'Para presupuestos personalizados, por favor contactanos a traves de /contacto o escribinos a contacto@devmentestudio.com.';
    }

    if (asksAboutStack) {
      return 'Trabajamos principalmente con Angular, .NET Core, Node.js y Azure.';
    }

    if (asksAboutContact) {
      return 'Podes escribirnos a contacto@devmentestudio.com o visitarnos desde Salta, Argentina.';
    }

    return 'Estoy recibiendo muchas consultas ahora. Mientras me recupero, podes preguntarme por servicios, precios o contacto y te respondo con mi base local.';
  }

  private getErrorMessage(language: AppLanguage): string {
    return language === 'en'
      ? 'There was an error processing your message. Please contact us at contacto@devmentestudio.com.'
      : 'Hubo un error al procesar tu mensaje. Contactanos en contacto@devmentestudio.com.';
  }

  clearChat(): void {
    this.initializeChat();
  }
}
