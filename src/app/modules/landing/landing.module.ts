/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './presentation/pages/landing/landing.component';
import { FeaturesSectionComponent } from './presentation/components/features-section/features-section.component';
import { WhyRevertSectionComponent } from './presentation/components/why-revert-section/why-revert-section.component';
import { AboutSectionComponent } from './presentation/components/about-section/about-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselSectionComponent } from './presentation/components/carousel-section/carousel-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RevertSectionComponent } from './presentation/components/revert-section/revert-section.component';

const COMPONENTS = [
  AboutSectionComponent,
  CarouselSectionComponent,
  FeaturesSectionComponent,
  LandingComponent,
  RevertSectionComponent,
  WhyRevertSectionComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    LandingRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class LandingModule {}
