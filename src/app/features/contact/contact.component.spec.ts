import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';
import { ContactService } from '../../core/services/contact.service';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  const contactServiceMock = {
    submit: vi.fn(),
  };

  beforeEach(async () => {
    contactServiceMock.submit.mockReset();

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{ provide: ContactService, useValue: contactServiceMock }],
    }).compileComponents();
  });

  it('should mark form touched and avoid submitting when invalid', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;

    await component.onSubmit();

    expect(component.contactForm.invalid).toBe(true);
    expect(component.submitted()).toBe(false);
    expect(component.contactForm.get('name')?.touched).toBe(true);
    expect(contactServiceMock.submit).not.toHaveBeenCalled();
  });

  it('should show success only after the contact service confirms the submission', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    contactServiceMock.submit.mockReturnValue(of(undefined));
    fillValidForm(component);

    await component.onSubmit();

    expect(contactServiceMock.submit).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
      company: 'ACME',
      service: 'Landing Page',
      budget: 'USD 1,000 - 5,000',
      message: 'Necesito una landing para mi negocio',
      botcheck: false,
    });
    expect(component.loading()).toBe(false);
    expect(component.submitted()).toBe(true);
    expect(component.submissionFailed()).toBe(false);
  });

  it('should show recovery alternatives and preserve form data when submission fails', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    contactServiceMock.submit.mockReturnValue(throwError(() => new Error('Network error')));
    fillValidForm(component);

    await component.onSubmit();
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.submitted()).toBe(false);
    expect(component.submissionFailed()).toBe(true);
    expect(component.contactForm.getRawValue().email).toBe('test@example.com');
    const errorAlert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(errorAlert.textContent).toContain('We could not send your message.');
    expect(errorAlert.querySelector('a[href^="mailto:"]')).toBeTruthy();
    expect(errorAlert.querySelector('a[href^="https://wa.me/"]')).toBeTruthy();
  });

  it('should ignore duplicate submissions while a request is pending', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    const pendingSubmission = new Subject<void>();
    contactServiceMock.submit.mockReturnValue(pendingSubmission.asObservable());
    fillValidForm(component);

    const firstSubmission = component.onSubmit();
    await component.onSubmit();

    expect(component.loading()).toBe(true);
    expect(contactServiceMock.submit).toHaveBeenCalledTimes(1);

    pendingSubmission.next();
    pendingSubmission.complete();
    await firstSubmission;
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

function fillValidForm(component: ContactComponent): void {
  component.contactForm.setValue({
    name: 'Test User',
    email: 'test@example.com',
    company: 'ACME',
    service: 'landing-page',
    budget: '1000-5000',
    message: 'Necesito una landing para mi negocio',
    botcheck: false,
  });
}
