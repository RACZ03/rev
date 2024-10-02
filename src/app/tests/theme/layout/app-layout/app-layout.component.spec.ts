import { TestBed } from '@angular/core/testing';
import { AppLayoutComponent } from '@theme/layout/app-layout/app-layout.component';
import { HeaderComponent } from '@theme/layout/header/header.component';
import { FooterComponent } from '@theme/layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppLayoutComponent, HeaderComponent, FooterComponent],
      imports: [RouterModule.forRoot([]), TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the AppLayoutComponent', () => {
    const fixture = TestBed.createComponent(AppLayoutComponent);
    const appLayout = fixture.componentInstance;
    expect(appLayout).toBeTruthy();
  });

  it('should contain app-header component', () => {
    const fixture = TestBed.createComponent(AppLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
  });

  it('should contain app-footer component', () => {
    const fixture = TestBed.createComponent(AppLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('should contain router-outlet', () => {
    const fixture = TestBed.createComponent(AppLayoutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
