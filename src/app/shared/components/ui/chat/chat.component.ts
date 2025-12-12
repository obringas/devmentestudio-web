import {
    Component,
    ChangeDetectionStrategy,
    signal,
    inject,
    computed,
    ViewChild,
    ElementRef,
    AfterViewChecked,
    PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, ChatMessage } from '../../../../core/services/gemini.service';

/**
 * Componente de chat flotante para interactuar con el asistente de Gemini.
 * Aparece como un botón en la esquina inferior derecha que abre un panel de chat.
 */
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

    @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;

    // Estado local del componente
    readonly isOpen = signal(false);
    readonly inputMessage = signal('');

    // Estado del servicio
    readonly messages = this.geminiService.messages;
    readonly isLoading = this.geminiService.isLoading;
    readonly error = this.geminiService.error;

    // Computed para controlar el scroll
    private shouldScroll = false;

    readonly isBrowser = computed(() => isPlatformBrowser(this.platformId));

    ngAfterViewChecked(): void {
        if (this.shouldScroll && this.messagesContainer) {
            this.scrollToBottom();
            this.shouldScroll = false;
        }
    }

    toggleChat(): void {
        this.isOpen.update(open => !open);
        if (this.isOpen()) {
            // Focus en el input cuando se abre
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
