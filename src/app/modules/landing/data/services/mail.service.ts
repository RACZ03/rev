import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { ContactModel, NewsletterModel } from '../models';
import { Observable } from 'rxjs';
import { ResponseI } from '@app/core/utils';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  url: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  sendContactMail(contact: ContactModel): Observable<ResponseI<ContactModel>> {
    return this.http.post<ResponseI<ContactModel>>(
      `${this.url}/mail/contact`,
      contact
    );
  }

  sendNewsletterMail(
    newsletter: NewsletterModel
  ): Observable<ResponseI<NewsletterModel>> {
    return this.http.post<ResponseI<NewsletterModel>>(
      `${this.url}/mail/newsletter`,
      newsletter
    );
  }
}
