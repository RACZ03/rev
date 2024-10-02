import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '@theme/layout/header/header.component';
import { provideRouter } from '@angular/router';
import { ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const elementRefMock = {
    nativeElement: {
      querySelector: jasmine.createSpy('querySelector').and.returnValue({
        contains: () => true,
      }),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ElementRef, useValue: elementRefMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the main menu', () => {
    component.isMenuClosed = true;
    component.toggleMenu();
    expect(component.isMenuClosed).toBeFalse();

    component.toggleMenu();
    expect(component.isMenuClosed).toBeTrue();
  });

  it('should close the menu', () => {
    component.isMenuClosed = false;
    component.closeMenu();
    expect(component.isMenuClosed).toBeTrue();
  });

  it('should toggle the markets sub-menu', () => {
    component.isMarketsSubMenuOpen = false;
    component.toggleMarketsSubMenu();
    expect(component.isMarketsSubMenuOpen).toBeTrue();

    component.toggleMarketsSubMenu();
    expect(component.isMarketsSubMenuOpen).toBeFalse();
  });

  it('should toggle the tech sub-menu', () => {
    component.isTechSubMenuOpen = false;
    component.toggleTechSubMenu();
    expect(component.isTechSubMenuOpen).toBeTrue();

    component.toggleTechSubMenu();
    expect(component.isTechSubMenuOpen).toBeFalse();
  });

  it('should scroll to the correct section', () => {
    const scrollIntoViewSpy = spyOn(Element.prototype, 'scrollIntoView');
    const mockElement = document.createElement('div');
    mockElement.id = 'about-us';
    document.body.appendChild(mockElement);

    component.scrollToSection('about-us');
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockElement);
  });
});
