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

  private buildPayload(submission: ContactSubmission): Record<string, string | boolean> {
    return {
      access_key: this.formConfig.accessKey,
      subject: this.formConfig.subject,
      from_name: submission.name,
      botcheck: submission.botcheck,
      name: submission.name,
      email: submission.email,
      Empresa: submission.company || 'No informada',
      Servicio: submission.service || 'No informado',
      Presupuesto: submission.budget || 'No informado',
      message: submission.message,
    };
  }

  private validateResponse(response: HttpResponse<Web3FormsResponse>): void {
    if (response.status !== 200 || response.body?.success !== true) {
      throw new Error('Web3Forms rejected the contact submission.');
    }
  }
}
