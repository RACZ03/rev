import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';
import { ThemeModule } from '@app/theme';

@NgModule({
  declarations: [ModulesComponent],
  imports: [CommonModule, ModulesRoutingModule, ThemeModule],
})
export class ModulesModule {}
