import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '@theme/layout/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;

    // Mock the translate service
    translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'get').and.callFake((key: string) => {
      // Simulate returning translated text with the current year in the FOOTER.COPYRIGHT key
      const translations: { [key: string]: string } = {
        'FOOTER.COPYRIGHT': `Copyright © ${component.currentYear} Revert | Powered by Revert`,
        'FOOTER.DESCRIPTION': 'We build connectivity for the commodity markets',
      };
      return of(translations[key]);
    });

    fixture.detectChanges();
  });

  it('should create the FooterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentYear to the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('should render the current year in the template', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(new Date().getFullYear().toString());
  });
});
