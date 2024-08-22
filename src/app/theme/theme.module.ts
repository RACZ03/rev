import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { FooterComponent } from './layout/footer/footer.component';

const COMPONENTS = [AppLayoutComponent, HeaderComponent, FooterComponent];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ThemeModule {}
