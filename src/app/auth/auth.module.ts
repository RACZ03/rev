import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from '@app/theme';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, ThemeModule],
})
export class AuthModule {}
