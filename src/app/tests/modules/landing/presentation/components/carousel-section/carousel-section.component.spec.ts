/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CarouselSectionComponent } from '@modules/landing/presentation/components/carousel-section/carousel-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef, Renderer2 } from '@angular/core';
import { of } from 'rxjs';

describe('CarouselSectionComponent', () => {
  let component: CarouselSectionComponent;
  let fixture: ComponentFixture<CarouselSectionComponent>;
  let translateService: TranslateService;
  let renderer2: Renderer2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselSectionComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [ChangeDetectorRef],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselSectionComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);

    spyOn(translateService, 'get').and.callFake((key: string) => of(key));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle button click and change slide', fakeAsync(() => {
    const slideTo = 1;
    component.currentSlide = 0;
    const button = document.createElement('button');
    button.setAttribute('data-carousel-slide-to', slideTo.toString());

    fixture.nativeElement.appendChild(button);
    spyOn(component, 'handleSlideChange').and.callThrough();

    renderer2.listen(button, 'click', () => {
      component.handleSlideChange(slideTo);
    });

    button.click();
    tick();

    expect(component.handleSlideChange).toHaveBeenCalledWith(slideTo);
    expect(component.currentSlide).toBe(slideTo);

    flush();
  }));

  it('should handle fade-in activation after slide change', fakeAsync(() => {
    component.isActiveFadeIn = false;
    component.isActiveFadeOut = true;
    component.handleSlideChange(1);

    tick(50);
    fixture.detectChanges();

    expect(component.isActiveFadeIn).toBeTrue();

    flush();
  }));

  it('should add event listeners to all buttons with data-carousel-slide-to attribute', () => {
    const buttons = [0, 1, 2].map(slideIndex => {
      const button = document.createElement('button');
      button.setAttribute('data-carousel-slide-to', slideIndex.toString());
      return button;
    });

    buttons.forEach(button => fixture.nativeElement.appendChild(button));

    spyOn(renderer2, 'listen').and.callThrough();
    component.initializeCarouselEvents();

    buttons.forEach(button => {
      expect(renderer2.listen).toHaveBeenCalledWith(
        button,
        'click',
        jasmine.any(Function)
      );
    });
  });
});
