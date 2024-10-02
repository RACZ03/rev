import { Observable } from 'rxjs';
import { ContactEntity } from '../entities';
import { NewsletterEntity } from '../entities';
import { ResponseI } from '@app/core/utils';

export abstract class MailRepository {
  abstract sendContactMail(
    contact: ContactEntity
  ): Observable<ResponseI<ContactEntity>>;
  abstract sendNewsletterMail(
    newsletter: NewsletterEntity
  ): Observable<ResponseI<NewsletterEntity>>;
}
