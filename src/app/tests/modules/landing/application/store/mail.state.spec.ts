import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { MailState } from '@app/modules/landing/application/store/mail/mail.state';
import { MailRepository } from '@app/modules/landing/domain/repositories';
import {
  SendContactAction,
  SendNewsletterAction,
} from '@app/modules/landing/application/store/mail/mail.actions';
import {
  ContactEntity,
  NewsletterEntity,
} from '@app/modules/landing/domain/entities';
import { of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ResponseI } from '@app/core/utils';

describe('MailState', () => {
  let store: Store;
  let mailRepositorySpy: jasmine.SpyObj<MailRepository>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let translateSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const mailRepository = jasmine.createSpyObj('MailRepository', [
      'sendContactMail',
      'sendNewsletterMail',
    ]);

    const toastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const translateService = jasmine.createSpyObj('TranslateService', ['get']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MailState])],
      providers: [
        { provide: MailRepository, useValue: mailRepository },
        { provide: ToastrService, useValue: toastr },
        { provide: TranslateService, useValue: translateService },
      ],
    });

    store = TestBed.inject(Store);
    mailRepositorySpy = TestBed.inject(
      MailRepository
    ) as jasmine.SpyObj<MailRepository>;
    toastrSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    translateSpy = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
  });

  it('should dispatch SendContactAction and update the state on success', () => {
    const contact: ContactEntity = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    };

    const mockResponse: ResponseI<ContactEntity> = {
      status: 'success',
      message: 'Contact mail sent successfully',
      data: contact,
    };

    mailRepositorySpy.sendContactMail.and.returnValue(of(mockResponse));
    translateSpy.get.and.returnValue(of('Contact message sent successfully'));

    store.dispatch(new SendContactAction(contact)).subscribe(() => {
      const state = store.selectSnapshot(MailState);
      expect(state.contact).toEqual(contact);
      expect(mailRepositorySpy.sendContactMail).toHaveBeenCalledWith(contact);
      expect(toastrSpy.success).toHaveBeenCalledWith(
        'Contact message sent successfully'
      );
    });
  });

  it('should dispatch SendContactAction and show error toast on failure', () => {
    const contact: ContactEntity = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello',
    };

    mailRepositorySpy.sendContactMail.and.returnValue(
      throwError(() => new Error('Server error'))
    );
    translateSpy.get.and.returnValue(of('Failed to send contact message'));

    store.dispatch(new SendContactAction(contact)).subscribe({
      error: () => {
        expect(mailRepositorySpy.sendContactMail).toHaveBeenCalledWith(contact);
        expect(toastrSpy.error).toHaveBeenCalledWith(
          'Failed to send contact message'
        );
      },
    });
  });

  it('should dispatch SendNewsletterAction and update the state on success', () => {
    const newsletter: NewsletterEntity = { email: 'newsletter@example.com' };

    const mockResponse: ResponseI<NewsletterEntity> = {
      status: 'success',
      message: 'Newsletter mail sent successfully',
      data: newsletter,
    };

    mailRepositorySpy.sendNewsletterMail.and.returnValue(of(mockResponse));
    translateSpy.get.and.returnValue(of('Newsletter subscription successful'));

    store.dispatch(new SendNewsletterAction(newsletter)).subscribe(() => {
      const state = store.selectSnapshot(MailState);
      expect(state.newsletter).toEqual(newsletter);
      expect(mailRepositorySpy.sendNewsletterMail).toHaveBeenCalledWith(
        newsletter
      );
      expect(toastrSpy.success).toHaveBeenCalledWith(
        'Newsletter subscription successful'
      );
    });
  });

  it('should dispatch SendNewsletterAction and show error toast on failure', () => {
    const newsletter: NewsletterEntity = { email: 'newsletter@example.com' };

    mailRepositorySpy.sendNewsletterMail.and.returnValue(
      throwError(() => new Error('Server error'))
    );
    translateSpy.get.and.returnValue(of('Failed to send newsletter message'));

    store.dispatch(new SendNewsletterAction(newsletter)).subscribe({
      error: () => {
        expect(mailRepositorySpy.sendNewsletterMail).toHaveBeenCalledWith(
          newsletter
        );
        expect(toastrSpy.error).toHaveBeenCalledWith(
          'Failed to send newsletter message'
        );
      },
    });
  });
});
