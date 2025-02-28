import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { DemoState } from './modules/landing/application/store/demo';
import { landingConfig } from './modules/landing/application/landing.config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([DemoState]),
  ],
  providers: [...landingConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
