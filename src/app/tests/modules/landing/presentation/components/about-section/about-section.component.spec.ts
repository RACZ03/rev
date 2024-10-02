/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AboutSectionComponent } from '@modules/landing/presentation/components/about-section/about-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { NgxsModule, Store } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactEntity } from '@app/modules/landing/domain/entities';
import { SendContactAction } from '@app/modules/landing/application/store/mail';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;
  let translateService: TranslateService;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutSectionComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NgxsModule.forRoot([]),
        RouterTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSectionComponent);
    component = fixture.componentInstance;

    translateService = TestBed.inject(TranslateService);
    store = TestBed.inject(Store);
    spyOn(translateService, 'get').and.callFake((key: string) => of(key));
    spyOn(store, 'dispatch').and.callFake(() => of({}));

    component.animatedSection = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    component.animatedSection2 = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    component.animatedSection3 = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the contact form', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.get('name')).toBeTruthy();
    expect(component.contactForm.get('email')).toBeTruthy();
    expect(component.contactForm.get('message')).toBeTruthy();
  });

  it('should validate that name, email, and message are required', () => {
    const nameControl = component.contactForm.get('name');
    const emailControl = component.contactForm.get('email');
    const messageControl = component.contactForm.get('message');

    nameControl?.setValue('');
    emailControl?.setValue('');
    messageControl?.setValue('');

    expect(nameControl?.valid).toBeFalse();
    expect(emailControl?.valid).toBeFalse();
    expect(messageControl?.valid).toBeFalse();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate the input correctly', () => {
    const nameControl = component.contactForm.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();

    expect(component.validateInput('name')).toBeTrue();
    nameControl?.setValue('Valid Name');
    expect(component.validateInput('name')).toBeFalse();
  });

  it('should not submit the form if it is invalid', () => {
    component.contactForm.get('name')?.setValue('');
    component.contactForm.get('email')?.setValue('');
    component.contactForm.get('message')?.setValue('');

    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should submit the form if it is valid', fakeAsync(() => {
    const mockContact: ContactEntity = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
    };

    component.contactForm.setValue({
      name: mockContact.name,
      email: mockContact.email,
      message: mockContact.message,
    });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      new SendContactAction(mockContact)
    );

    tick();
    fixture.detectChanges();

    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('message')?.value).toBe('');

    flush();
  }));

  it('should call openEmail and open the mail client', () => {
    const openSpy = spyOn(window, 'open');
    component.openEmail();
    const email = component.env.fromEmail;
    const mailtoLink = `mailto:${email}?subject=&body=`;
    expect(openSpy).toHaveBeenCalledWith(mailtoLink, '_self');
  });

  it('should set isVisible to true if animatedSection is in viewport on load', fakeAsync(() => {
    const mockBoundingClientRect = {
      top: 100,
      bottom: 500,
    };
    spyOn(
      component.animatedSection.nativeElement,
      'getBoundingClientRect'
    ).and.returnValue(mockBoundingClientRect);

    component.checkIfSectionIsVisible();
    tick();

    expect(component.isVisible).toBeTrue();
  }));

  it('should set isVisible2 to true if animatedSection2 is in viewport on load', fakeAsync(() => {
    const mockBoundingClientRect2 = {
      top: 100,
      bottom: 500,
    };
    spyOn(
      component.animatedSection2.nativeElement,
      'getBoundingClientRect'
    ).and.returnValue(mockBoundingClientRect2);

    component.checkIfSectionIsVisible();
    tick();

    expect(component.isVisible2).toBeTrue();
  }));

  it('should set isVisible3 to true if animatedSection3 is in viewport on load', fakeAsync(() => {
    const mockBoundingClientRect3 = {
      top: 100,
      bottom: 500,
    };
    spyOn(
      component.animatedSection3.nativeElement,
      'getBoundingClientRect'
    ).and.returnValue(mockBoundingClientRect3);

    component.checkIfSectionIsVisible();
    tick();

    expect(component.isVisible3).toBeTrue();
  }));

  it('should set isVisible to true when animatedSection is in view', fakeAsync(() => {
    spyOn(component, 'checkIfSectionIsVisible').and.callThrough();

    const mockObserver = class {
      observe() {}
      disconnect() {}
      constructor(public callback: any) {
        setTimeout(() => {
          callback([
            {
              isIntersecting: true,
              target: component.animatedSection.nativeElement,
            },
          ]);
        }, 100);
      }
    };
    (window as any).IntersectionObserver = mockObserver;

    component.ngAfterViewInit();
    tick(150);

    expect(component.isVisible).toBeTrue();
    expect(component.checkIfSectionIsVisible).toHaveBeenCalled();
  }));

  it('should set isVisible2 to true when animatedSection2 is in view', fakeAsync(() => {
    spyOn(component, 'checkIfSectionIsVisible').and.callThrough();

    const mockObserver = class {
      observe() {}
      disconnect() {}
      constructor(public callback: any) {
        setTimeout(() => {
          callback([
            {
              isIntersecting: true,
              target: component.animatedSection2.nativeElement,
            },
          ]);
        }, 100);
      }
    };
    (window as any).IntersectionObserver = mockObserver;

    component.ngAfterViewInit();
    tick(150);

    expect(component.isVisible2).toBeTrue();
    expect(component.checkIfSectionIsVisible).toHaveBeenCalled();
  }));

  it('should set isVisible3 to true when animatedSection3 is in view', fakeAsync(() => {
    spyOn(component, 'checkIfSectionIsVisible').and.callThrough();

    const mockObserver = class {
      observe() {}
      disconnect() {}
      constructor(public callback: any) {
        setTimeout(() => {
          callback([
            {
              isIntersecting: true,
              target: component.animatedSection3.nativeElement,
            },
          ]);
        }, 100);
      }
    };
    (window as any).IntersectionObserver = mockObserver;

    component.ngAfterViewInit();
    tick(150);

    expect(component.isVisible3).toBeTrue();
    expect(component.checkIfSectionIsVisible).toHaveBeenCalled();
  }));

  it('should call checkIfSectionIsVisible on scroll', fakeAsync(() => {
    spyOn(component, 'checkIfSectionIsVisible').and.callThrough();

    window.dispatchEvent(new Event('scroll'));
    tick(100);

    expect(component.checkIfSectionIsVisible).toHaveBeenCalled();
  }));

  it('should scroll to section and call checkIfSectionIsVisible', fakeAsync(() => {
    spyOn(component, 'checkIfSectionIsVisible').and.callThrough();

    component.scrollToSection('about');
    tick(500);

    expect(component.checkIfSectionIsVisible).toHaveBeenCalled();
  }));
});
