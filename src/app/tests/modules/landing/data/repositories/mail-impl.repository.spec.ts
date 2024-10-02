import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MailService } from '@app/modules/landing/data/services';
import { MailImplRepository } from '@app/modules/landing/data/repositories';
import {
  ContactModel,
  NewsletterModel,
} from '@app/modules/landing/data/models/index';
import {
  ContactEntity,
  NewsletterEntity,
} from '@app/modules/landing/domain/entities/index';
import { ResponseI } from '@app/core/utils';

describe('MailImplRepository', () => {
  let repository: MailImplRepository;
  let mailServiceSpy: jasmine.SpyObj<MailService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MailService', [
      'sendContactMail',
      'sendNewsletterMail',
    ]);

    TestBed.configureTestingModule({
      providers: [MailImplRepository, { provide: MailService, useValue: spy }],
    });

    repository = TestBed.inject(MailImplRepository);
    mailServiceSpy = TestBed.inject(MailService) as jasmine.SpyObj<MailService>;
  });

  it('should send contact mail and map the response correctly', () => {
    const contact: ContactModel = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    };
    const contactEntity: ContactEntity = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    };

    const mockResponse: ResponseI<ContactModel> = {
      status: 'success',
      message: 'Contact mail sent successfully',
      data: contact,
    };

    mailServiceSpy.sendContactMail.and.returnValue(of(mockResponse));

    repository.sendContactMail(contact).subscribe(response => {
      expect(response.status).toBe('success');
      expect(response.message).toBe('Contact mail sent successfully');
      expect(response.data).toEqual(contactEntity);
    });

    expect(mailServiceSpy.sendContactMail).toHaveBeenCalledWith(contact);
  });

  it('should send newsletter mail and map the response correctly', () => {
    const newsletter: NewsletterModel = { email: 'newsletter@example.com' };
    const newsletterEntity: NewsletterEntity = {
      email: 'newsletter@example.com',
    };

    const mockResponse: ResponseI<NewsletterModel> = {
      status: 'success',
      message: 'Newsletter mail sent successfully',
      data: newsletter,
    };

    mailServiceSpy.sendNewsletterMail.and.returnValue(of(mockResponse));

    repository.sendNewsletterMail(newsletter).subscribe(response => {
      expect(response.status).toBe('success');
      expect(response.message).toBe('Newsletter mail sent successfully');
      expect(response.data).toEqual(newsletterEntity);
    });

    expect(mailServiceSpy.sendNewsletterMail).toHaveBeenCalledWith(newsletter);
  });

  it('should handle error for contact mail correctly', () => {
    const contact: ContactModel = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    };
    const mockError = { status: 500, message: 'Server error' };

    mailServiceSpy.sendContactMail.and.returnValue(throwError(mockError));

    repository.sendContactMail(contact).subscribe(
      () => fail('Expected an error, but got a success response'),
      error => {
        expect(error).toEqual(mockError);
      }
    );

    expect(mailServiceSpy.sendContactMail).toHaveBeenCalledWith(contact);
  });

  it('should handle error for newsletter mail correctly', () => {
    const newsletter: NewsletterModel = { email: 'newsletter@example.com' };
    const mockError = { status: 500, message: 'Server error' };

    mailServiceSpy.sendNewsletterMail.and.returnValue(throwError(mockError));

    repository.sendNewsletterMail(newsletter).subscribe(
      () => fail('Expected an error, but got a success response'),
      error => {
        expect(error).toEqual(mockError);
      }
    );

    expect(mailServiceSpy.sendNewsletterMail).toHaveBeenCalledWith(newsletter);
  });
});
