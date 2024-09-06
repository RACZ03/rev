/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './presentation/pages/landing/landing.component';
import { DemoComponent } from './presentation/pages/demo/demo.component';
import { HeroSectionComponent } from './presentation/components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from './presentation/components/features-section/features-section.component';
import { WhyRevertSectionComponent } from './presentation/components/why-revert-section/why-revert-section.component';
import { AboutSectionComponent } from './presentation/components/about-section/about-section.component';

const COMPONENTS = [
  LandingComponent,
  DemoComponent,
  HeroSectionComponent,
  FeaturesSectionComponent,
  WhyRevertSectionComponent,
  AboutSectionComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}
