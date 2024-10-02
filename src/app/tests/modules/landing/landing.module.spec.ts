/* eslint-disable max-len */
import { TestBed } from '@angular/core/testing';
import { LandingModule } from '@modules/landing/landing.module';
import { LandingRoutingModule } from '@modules/landing/landing-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from '@modules/landing/presentation/pages/landing/landing.component';
import { CarouselSectionComponent } from '@modules/landing/presentation/components/carousel-section/carousel-section.component';
import { FeaturesSectionComponent } from '@modules/landing/presentation/components/features-section/features-section.component';
import { WhyRevertSectionComponent } from '@modules/landing/presentation/components/why-revert-section/why-revert-section.component';
import { AboutSectionComponent } from '@modules/landing/presentation/components/about-section/about-section.component';
import { RevertSectionComponent } from '@app/modules/landing/presentation/components/revert-section/revert-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';

describe('LandingModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LandingModule,
        CommonModule,
        LandingRoutingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
      ],
      providers: [Store],
    }).compileComponents();
  });

  it('should create the module', () => {
    const module = TestBed.inject(LandingModule);
    expect(module).toBeTruthy();
  });

  it('should declare the LandingComponent', () => {
    const fixture = TestBed.createComponent(LandingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should declare the CarouselSectionComponent', () => {
    const fixture = TestBed.createComponent(CarouselSectionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should declare the FeaturesSectionComponent', () => {
    const fixture = TestBed.createComponent(FeaturesSectionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should declare the WhyRevertSectionComponent', () => {
    const fixture = TestBed.createComponent(WhyRevertSectionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should declare the AboutSectionComponent', () => {
    const fixture = TestBed.createComponent(AboutSectionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should declare the RevertSectionComponent', () => {
    const fixture = TestBed.createComponent(RevertSectionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
