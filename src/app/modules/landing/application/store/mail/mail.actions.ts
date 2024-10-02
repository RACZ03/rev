import {
  ContactEntity,
  NewsletterEntity,
} from '@app/modules/landing/domain/entities';

export class SendContactAction {
  static readonly type = '[Mail] Send Contact';
  constructor(public contact: ContactEntity) {}
}

export class SendNewsletterAction {
  static readonly type = '[Mail] Send Newsletter';
  constructor(public newsletter: NewsletterEntity) {}
}
