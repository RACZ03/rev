/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RevertSectionComponent } from '@modules/landing/presentation/components/revert-section/revert-section.component';
import { ElementRef } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('RevertSectionComponent', () => {
  let component: RevertSectionComponent;
  let fixture: ComponentFixture<RevertSectionComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevertSectionComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RevertSectionComponent);
    component = fixture.componentInstance;

    component.animatedSection = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of revert items with titles and images', () => {
    expect(component.revertItems.length).toBe(4);

    expect(component.revertItems[0].title).toBe(
      'LANDING_PAGE.REVERT.SELLERS_TITLE'
    );
    expect(component.revertItems[0].image).toBe(
      './assets/img/revert/mobile-no-signal-icon 1.png'
    );
    expect(component.revertItems[0].items.length).toBe(3);

    expect(component.revertItems[3].title).toBe(
      'LANDING_PAGE.REVERT.CREDIT_TITLE'
    );
    expect(component.revertItems[3].image).toBe(
      './assets/img/revert/Group.png'
    );
    expect(component.revertItems[3].items.length).toBe(2);
  });

  it('should set isVisible to true when animatedSection is in view', fakeAsync(() => {
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

  it('should set isVisible to false when animatedSection is not in view', fakeAsync(() => {
    const mockObserver = class {
      observe() {}
      disconnect() {}
      constructor(public callback: any) {
        setTimeout(() => {
          callback([
            {
              isIntersecting: false,
              target: component.animatedSection.nativeElement,
            },
          ]);
        }, 100);
      }
    };
    (window as any).IntersectionObserver = mockObserver;

    component.ngAfterViewInit();
    tick(150);

    expect(component.isVisible).toBeFalse();
  }));
});
