import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { siteConfig } from '../../config/site.config';

export interface ContactSubmission {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  botcheck: boolean;
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly formConfig = siteConfig.contact.form;

  submit(submission: ContactSubmission): Observable<void> {
    return this.http
      .post<Web3FormsResponse>(this.formConfig.endpoint, this.buildPayload(submission), {
        observe: 'response',
      })
      .pipe(map((response) => this.validateResponse(response)));
  }

  private buildPayload(submission: ContactSubmission): FormData {
    const payload = new FormData();
    payload.append('access_key', this.formConfig.accessKey);
    payload.append('subject', this.formConfig.subject);
    payload.append('from_name', submission.name);
    payload.append('botcheck', submission.botcheck ? 'true' : '');
    payload.append('name', submission.name);
    payload.append('email', submission.email);
    payload.append('Empresa', submission.company || 'No informada');
    payload.append('Servicio', submission.service || 'No informado');
    payload.append('Presupuesto', submission.budget || 'No informado');
    payload.append('message', submission.message);
    return payload;
  }

  private validateResponse(response: HttpResponse<Web3FormsResponse>): void {
    if (response.status !== 200 || response.body?.success !== true) {
      throw new Error('Web3Forms rejected the contact submission.');
    }
  }
}
