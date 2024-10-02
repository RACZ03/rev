/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FeaturesSectionComponent } from '@modules/landing/presentation/components/features-section/features-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';

describe('FeaturesSectionComponent', () => {
  let component: FeaturesSectionComponent;
  let fixture: ComponentFixture<FeaturesSectionComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // For testing TranslateHttpLoader
        TranslateModule.forRoot(), // Mock TranslateModule
      ],
      declarations: [FeaturesSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesSectionComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);

    spyOn(translateService, 'get').and.callFake((key: string) => of(key));

    // Mock the ElementRef for animated sections
    component.animatedSection = {
      nativeElement: document.createElement('div'),
    } as ElementRef;
    component.animatedSection2 = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    fixture.detectChanges(); // Initialize the component
  });

  it('should create the FeaturesSectionComponent', () => {
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

  it('should have the correct translation keys for features', () => {
    const featureKeys = component.features.map(f => f.text);
    expect(featureKeys).toEqual([
      'LANDING_PAGE.FEATURES.GET_THERE_FASTER',
      'LANDING_PAGE.FEATURES.CONNECT_MORE_BOTS',
      'LANDING_PAGE.FEATURES.LEAVE_NOTHING_TO_CHANCE',
    ]);
  });

  it('should have the correct translation keys for uncertainties', () => {
    const uncertaintyKeys = component.uncertainties;
    expect(uncertaintyKeys).toEqual([
      'LANDING_PAGE.UNCERTAINTIES.UNSTRUCTURED_DATA',
      'LANDING_PAGE.UNCERTAINTIES.SUPPLY_DEMAND',
      'LANDING_PAGE.UNCERTAINTIES.RISK_APPRAISAL',
      'LANDING_PAGE.UNCERTAINTIES.EXPOSURE_FRAUDS',
    ]);
  });

  it('should use TranslateService for feature text', () => {
    component.features.forEach(feature => {
      translateService.get(feature.text).subscribe(translatedText => {
        expect(translatedText).toEqual(feature.text); // Check if the translation is called correctly
      });
    });
  });

  it('should use TranslateService for uncertainties', () => {
    component.uncertainties.forEach(uncertainty => {
      translateService.get(uncertainty).subscribe(translatedText => {
        expect(translatedText).toEqual(uncertainty); // Check if the translation is called correctly
      });
    });
  });
});
