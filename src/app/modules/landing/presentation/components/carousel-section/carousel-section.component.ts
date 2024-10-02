import {
  Component,
  AfterViewInit,
  Renderer2,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-carousel-section',
  templateUrl: './carousel-section.component.html',
  styleUrls: ['./carousel-section.component.css'],
})
export class CarouselSectionComponent implements AfterViewInit {
  isActiveFadeIn = false;
  isActiveFadeOut = false;
  currentSlide = 0;
  totalSlides = 3;

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.isActiveFadeIn = false;
    this.initializeCarouselEvents();

    Promise.resolve().then(() => {
      this.isActiveFadeOut = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.isActiveFadeIn = true;
        this.cdr.detectChanges();
      }, 400);
    });
  }

  initializeCarouselEvents() {
    const buttons = document.querySelectorAll('[data-carousel-slide-to]');
    buttons.forEach(button => {
      this.renderer.listen(
        button,
        'click',
        (event: { target: HTMLElement }) => {
          this.isActiveFadeIn = false;
          this.isActiveFadeOut = true;
          this.cdr.detectChanges();
          const slideTo = parseInt(
            (event.target as HTMLElement).getAttribute(
              'data-carousel-slide-to'
            ) || '0',
            10
          );
          this.handleSlideChange(slideTo);
        }
      );
    });
  }

  handleSlideChange(targetSlide: number) {
    this.currentSlide = targetSlide;
    setTimeout(() => {
      this.isActiveFadeIn = true;
      this.cdr.detectChanges();
    }, 50);
  }
}
