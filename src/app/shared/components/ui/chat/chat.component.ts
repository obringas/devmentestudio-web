import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, ChatMessage } from '../../../../core/services/gemini.service';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements AfterViewChecked {
  private readonly geminiService = inject(GeminiService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly locale = inject(LocaleService);

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

  readonly language = this.locale.language;
  readonly isOpen = signal(false);
  readonly inputMessage = signal('');
  readonly messages = this.geminiService.messages;
  readonly isLoading = this.geminiService.isLoading;
  readonly error = this.geminiService.error;
  readonly isBrowser = computed(() => isPlatformBrowser(this.platformId));

  readonly copy = computed(() => (
    this.language() === 'en'
      ? {
          toggleLabel: 'Open support chat',
          dialogLabel: 'Support chat',
          title: 'DevMente Assistant',
          subtitle: 'I answer your questions instantly',
          clear: 'Clear chat',
          placeholder: 'Write your message...',
          send: 'Send message',
        }
      : {
          toggleLabel: 'Abrir chat de asistencia',
          dialogLabel: 'Chat de asistencia',
          title: 'Asistente DevMente',
          subtitle: 'Respondo tus dudas al instante',
          clear: 'Limpiar chat',
          placeholder: 'Escribe tu mensaje...',
          send: 'Enviar mensaje',
        }
  ));

  private shouldScroll = false;

  ngAfterViewChecked(): void {
    if (this.shouldScroll && this.messagesContainer) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggleChat(): void {
    this.isOpen.update((open) => !open);
    if (this.isOpen()) {
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 100);
    }
  }

  sendMessage(): void {
    const message = this.inputMessage().trim();
    if (!message || this.isLoading()) return;

    this.inputMessage.set('');
    this.shouldScroll = true;

    this.geminiService.sendMessage(message).subscribe(() => {
      this.shouldScroll = true;
    });
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.inputMessage.set(target?.value ?? '');
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat(): void {
    this.geminiService.clearChat();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer?.nativeElement) {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  trackByMessage(index: number, message: ChatMessage): number {
    return message.timestamp.getTime();
  }
}
