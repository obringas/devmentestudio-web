import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { GeminiService } from './gemini.service';

describe('GeminiService', () => {
  function setup(platformId: 'browser' | 'server' = 'browser') {
    TestBed.configureTestingModule({
      providers: [
        GeminiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    return {
      service: TestBed.inject(GeminiService),
      httpMock: TestBed.inject(HttpTestingController),
    };
  }

  it('should send message to /api/chat and append assistant response', async () => {
    const { service, httpMock } = setup('browser');
    const responsePromise = firstValueFrom(service.sendMessage('Hola'));

    const req = httpMock.expectOne('/api/chat');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ message: 'Hola' });
    req.flush({ response: 'Respuesta IA' });
    const responseText = await responsePromise;

    const messages = service.messages();
    expect(responseText).toBe('Respuesta IA');
    expect(messages.at(-1)?.role).toBe('assistant');
    expect(messages.at(-1)?.content).toBe('Respuesta IA');
    expect(service.isLoading()).toBe(false);
    httpMock.verify();
  });

  it('should use fallback response when backend fails', async () => {
    const { service, httpMock } = setup('browser');
    const responsePromise = firstValueFrom(service.sendMessage('precio'));

    const req = httpMock.expectOne('/api/chat');
    req.flush({ error: 'boom' }, { status: 500, statusText: 'Server Error' });
    const responseText = await responsePromise;

    expect(responseText).toContain('presupuestos personalizados');
    expect(service.messages().at(-1)?.role).toBe('assistant');
    expect(service.isLoading()).toBe(false);
    httpMock.verify();
  });

  it('should return empty string on server platform without calling backend', () => {
    const { service, httpMock } = setup('server');
    let responseText = 'not-empty';

    service.sendMessage('Hola').subscribe((response) => {
      responseText = response;
    });

    expect(responseText).toBe('');
    httpMock.expectNone('/api/chat');
    httpMock.verify();
  });
});
