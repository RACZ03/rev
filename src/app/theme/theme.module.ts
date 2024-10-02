import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [AppLayoutComponent, HeaderComponent, FooterComponent];

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ThemeModule {}
