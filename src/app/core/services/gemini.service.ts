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
          ? 'Hi! I am the DevMenteStudio assistant. I can tell you about our legacy modernization services, web development, technologies or how to contact us.'
          : '¡Hola! Soy el asistente de DevMenteStudio. Puedo contarte sobre modernización de sistemas legacy, desarrollo de software, tecnologías o cómo contactarnos.',
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
    const asksAboutServices = lowerMsg.includes('service') || lowerMsg.includes('servicios') || lowerMsg.includes('hacen') || lowerMsg.includes('do you do') || lowerMsg.includes('moderniz');
    const asksAboutPrice = lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('precio') || lowerMsg.includes('costo') || lowerMsg.includes('presupuesto');
    const asksAboutStack = lowerMsg.includes('stack') || lowerMsg.includes('technolog') || lowerMsg.includes('tecnolog') || lowerMsg.includes('foxpro') || lowerMsg.includes('sql');
    const asksAboutContact = lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('contacto') || lowerMsg.includes('mail');

    if (language === 'en') {
      if (asksAboutServices) {
        return 'We specialize in gradual management system modernization, websites that generate enquiries, online stores, custom software, and technical assessment. Would you like details on any of these?';
      }

      if (asksAboutPrice) {
        return 'For a tailored quote or technical diagnosis, please reach out through /contacto or email contacto@devmentestudio.com.';
      }

      if (asksAboutStack) {
        return 'We specialize in .NET 8, C#, SQL Server, Visual FoxPro modernization, Angular, Next.js and Microsoft Azure.';
      }

      if (asksAboutContact) {
        return 'You can email us at contacto@devmentestudio.com or reach us from Salta, Argentina.';
      }

      return 'I am handling high request traffic right now. Feel free to ask about modernization, services, pricing or contact details and I will assist you!';
    }

    if (asksAboutServices) {
      return 'Nos especializamos en modernización gradual de sistemas de gestión, sitios para captar consultas, tiendas online, software a medida y diagnóstico técnico. ¿Te interesa conocer más detalles sobre alguno?';
    }

    if (asksAboutPrice) {
      return 'Para un diagnóstico técnico o presupuesto a medida, por favor contactanos a través de /contacto o escribinos a contacto@devmentestudio.com.';
    }

    if (asksAboutStack) {
      return 'Trabajamos con .NET 8, C#, SQL Server, modernización de Visual FoxPro, Angular, Next.js y Microsoft Azure.';
    }

    if (asksAboutContact) {
      return 'Podés escribirnos a contacto@devmentestudio.com o contactarnos directamente desde Salta, Argentina.';
    }

    return 'Estoy recibiendo muchas consultas en este momento. Podés preguntarme sobre modernización, servicios, tecnologías o contacto y con gusto te respondo.';
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
