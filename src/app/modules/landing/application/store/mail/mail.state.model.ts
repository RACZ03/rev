import {
  ContactEntity,
  NewsletterEntity,
} from '@app/modules/landing/domain/entities';

export interface MailStateModel {
  contact: ContactEntity | null;
  newsletter: NewsletterEntity | null;
}
