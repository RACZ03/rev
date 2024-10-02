import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '@theme/theme.module';
import { HeaderComponent } from '@theme/layout/header/header.component';
import { AppLayoutComponent } from '@theme/layout/app-layout/app-layout.component';
import { FooterComponent } from '@theme/layout/footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ThemeModule', () => {
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot([]), // Simulate empty router for testing
        TranslateModule.forRoot(), // Provide TranslateModule
        HttpClientTestingModule, // Needed for TranslateModule's loader
        ThemeModule,
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'get').and.callFake((key: string) => of(key)); // Mock TranslateService.get()
  });

  it('should create the ThemeModule', () => {
    expect(ThemeModule).toBeTruthy();
  });

  it('should declare and export AppLayoutComponent', () => {
    const fixture = TestBed.createComponent(AppLayoutComponent);
    const appLayout = fixture.componentInstance;
    expect(appLayout).toBeTruthy();
  });

  it('should declare and export HeaderComponent', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const header = fixture.componentInstance;
    expect(header).toBeTruthy();
  });

  it('should declare and export FooterComponent', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.componentInstance;
    expect(footer).toBeTruthy();
  });

  it('should provide TranslateService for HeaderComponent', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const header = fixture.componentInstance;
    translateService.get('HEADER.ABOUT_US').subscribe(translatedText => {
      expect(translatedText).toBe('HEADER.ABOUT_US');
    });
    expect(header).toBeTruthy();
  });

  it('should provide TranslateService for FooterComponent', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const footer = fixture.componentInstance;
    translateService.get('FOOTER.COPYRIGHT').subscribe(translatedText => {
      expect(translatedText).toBe('FOOTER.COPYRIGHT');
    });
    expect(footer).toBeTruthy();
  });
});
