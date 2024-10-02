/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { WhyRevertSectionComponent } from '@modules/landing/presentation/components/why-revert-section/why-revert-section.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';
import { SendNewsletterAction } from '@app/modules/landing/application/store/mail';
import { of } from 'rxjs';

describe('WhyRevertSectionComponent', () => {
  let component: WhyRevertSectionComponent;
  let fixture: ComponentFixture<WhyRevertSectionComponent>;
  let translateService: TranslateService;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyRevertSectionComponent],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        NgxsModule.forRoot([]),
      ],
      providers: [ChangeDetectorRef, Store],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyRevertSectionComponent);
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

  it('should create the WhyRevertSectionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set isVisible to true when animatedSection is intersecting', fakeAsync(() => {
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
  }));

  it('should set isVisible2 to true when animatedSection2 is intersecting', fakeAsync(() => {
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
  }));

  it('should set isVisible3 to true when animatedSection3 is intersecting', fakeAsync(() => {
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
  }));

  it('should submit the newsletter form and reset it on success', fakeAsync(() => {
    component.newsletterForm.setValue({
      email: 'test@example.com',
      consent: true,
    });

    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      new SendNewsletterAction({ email: 'test@example.com' })
    );

    tick();

    fixture.whenStable().then(() => {
      expect(component.newsletterForm.get('email')?.value).toBe('');
      expect(component.newsletterForm.get('consent')?.value).toBe(false);
    });
  }));

  it('should not submit the newsletter form if invalid', () => {
    component.newsletterForm.setValue({
      email: '',
      consent: false,
    });

    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should validate input correctly', () => {
    component.newsletterForm.get('email')?.setValue('');
    component.newsletterForm.get('email')?.markAsTouched();

    expect(component.validateInput('email')).toBeTrue();
  });
});
