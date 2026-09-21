import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactService, ContactSubmission } from './contact.service';
import { siteConfig } from '../../config/site.config';

describe('ContactService', () => {
  let service: ContactService;
  let httpTesting: HttpTestingController;

  const submission: ContactSubmission = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    company: 'Analytical Engines',
    service: 'Modernización de sistema existente',
    budget: 'USD 5.000 - 10.000',
    message: 'Necesito modernizar un sistema crítico.',
    botcheck: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ContactService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should send a readable Web3Forms payload and complete on a successful response', () => {
    let completed = false;

    service.submit(submission).subscribe({ complete: () => (completed = true) });

    const request = httpTesting.expectOne(siteConfig.contact.form.endpoint);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      access_key: siteConfig.contact.form.accessKey,
      subject: 'Nueva consulta desde devmentestudio.com',
      from_name: 'Ada Lovelace',
      botcheck: false,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      Empresa: 'Analytical Engines',
      Servicio: 'Modernización de sistema existente',
      Presupuesto: 'USD 5.000 - 10.000',
      message: 'Necesito modernizar un sistema crítico.',
    });

    request.flush({ success: true, message: 'Email sent successfully!' });
    expect(completed).toBe(true);
  });

  it('should fail when Web3Forms returns HTTP 200 with success false', () => {
    let receivedError: unknown;

    service.submit(submission).subscribe({ error: (error) => (receivedError = error) });

    httpTesting
      .expectOne(siteConfig.contact.form.endpoint)
      .flush({ success: false, message: 'Submission rejected' });

    expect(receivedError).toBeInstanceOf(Error);
  });

  it('should propagate non-200 HTTP responses', () => {
    let receivedError: unknown;

    service.submit(submission).subscribe({ error: (error) => (receivedError = error) });

    httpTesting
      .expectOne(siteConfig.contact.form.endpoint)
      .flush({ success: false }, { status: 500, statusText: 'Server Error' });

    expect(receivedError).toBeTruthy();
  });
});
