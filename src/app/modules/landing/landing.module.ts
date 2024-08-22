import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './presentation/pages/landing/landing.component';
import { DemoComponent } from './presentation/pages/demo/demo.component';

@NgModule({
  declarations: [LandingComponent, DemoComponent],
  imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}
