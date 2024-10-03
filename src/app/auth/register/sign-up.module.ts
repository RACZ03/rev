/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePasswordRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './presentation/pages/sign-up/sign-up.component';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, CreatePasswordRoutingModule],
})
export class SignUpModule {}
