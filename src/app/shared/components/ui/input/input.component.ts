import { 
  Component, 
  input, 
  forwardRef,
  signal,
  ChangeDetectionStrategy 
} from '@angular/core';
import { NgClass } from '@angular/common';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR,
  FormsModule 
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgClass, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="w-full">
      @if (label()) {
        <label 
          [for]="inputId()" 
          class="block text-sm font-medium text-surface-300 mb-2"
        >
          {{ label() }}
          @if (required()) {
            <span class="text-red-400">*</span>
          }
        </label>
      }
      
      <div class="relative">
        <input
          [id]="inputId()"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [ngClass]="inputClasses"
          [ngModel]="value()"
          (ngModelChange)="onValueChange($event)"
          (blur)="onTouched()"
          class="input"
        />
        
        @if (icon()) {
          <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span class="text-surface-500">{{ icon() }}</span>
          </div>
        }
      </div>
      
      @if (error()) {
        <p class="mt-2 text-sm text-red-400">{{ error() }}</p>
      }
      
      @if (hint() && !error()) {
        <p class="mt-2 text-sm text-surface-500">{{ hint() }}</p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  readonly inputId = input<string>(`input-${Math.random().toString(36).slice(2)}`);
  readonly type = input<'text' | 'email' | 'password' | 'tel' | 'url' | 'number'>('text');
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly hint = input<string>('');
  readonly error = input<string>('');
  readonly icon = input<string>('');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly value = signal<string>('');
  
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get inputClasses(): Record<string, boolean> {
    return {
      'pr-12': !!this.icon(),
      'border-red-500 focus:border-red-500 focus:ring-red-500/50': !!this.error(),
      'opacity-50 cursor-not-allowed': this.disabled(),
    };
  }

  onValueChange(newValue: string): void {
    this.value.set(newValue);
    this.onChange(newValue);
  }

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(_isDisabled: boolean): void {
    // Handled by input signal
  }
}
