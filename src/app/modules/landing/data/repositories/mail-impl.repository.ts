import { Injectable } from '@angular/core';
import { MailRepository } from '../../domain/repositories';
import { ContactMapper, NewsletterMapper } from '../mappers';
import { MailService } from '../services/mail.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseI } from '@app/core/utils';
import { ContactModel, NewsletterModel } from '../models';
import { ContactEntity, NewsletterEntity } from '../../domain/entities';

@Injectable({
  providedIn: 'root',
})
export class MailImplRepository extends MailRepository {
  private contactMapper = new ContactMapper();
  private newsletterMapper = new NewsletterMapper();

  constructor(private mailService: MailService) {
    super();
  }

  sendContactMail(contact: ContactModel): Observable<ResponseI<ContactEntity>> {
    return this.mailService.sendContactMail(contact).pipe(
      map((response: ResponseI<ContactModel>) => ({
        data: this.contactMapper.mapTo(response.data),
        message: response.message,
        status: response.status,
      }))
    );
  }

  sendNewsletterMail(
    newsletter: NewsletterModel
  ): Observable<ResponseI<NewsletterEntity>> {
    return this.mailService.sendNewsletterMail(newsletter).pipe(
      map((response: ResponseI<NewsletterModel>) => ({
        data: this.newsletterMapper.mapTo(response.data),
        message: response.message,
        status: response.status,
      }))
    );
  }
}
