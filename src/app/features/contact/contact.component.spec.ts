import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();
  });

  it('should mark form touched and keep submitted false when invalid', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;

    component.onSubmit();

    expect(component.contactForm.invalid).toBe(true);
    expect(component.submitted()).toBe(false);
    expect(component.contactForm.get('name')?.touched).toBe(true);
  });

  it('should submit valid form and set submitted after timeout', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    vi.useFakeTimers();

    component.contactForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      company: 'ACME',
      service: 'landing-page',
      budget: '500-1000',
      message: 'Necesito una landing para mi negocio',
    });

    component.onSubmit();
    expect(component.loading()).toBe(true);

    vi.advanceTimersByTime(1500);

    expect(component.loading()).toBe(false);
    expect(component.submitted()).toBe(true);
    vi.useRealTimers();
  });

  it('should report field as invalid when touched and invalid', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;

    const email = component.contactForm.get('email');
    email?.setValue('bad-email');
    email?.markAsTouched();

    expect(component.isFieldInvalid('email')).toBe(true);
  });
});
