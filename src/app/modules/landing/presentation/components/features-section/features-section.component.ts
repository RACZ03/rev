import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
})
export class FeaturesSectionComponent implements AfterViewInit {
  public features = [
    {
      text: 'LANDING_PAGE.FEATURES.GET_THERE_FASTER',
      icon: 'fast-speed-icon 1.png',
    },
    {
      text: 'LANDING_PAGE.FEATURES.CONNECT_MORE_BOTS',
      icon: 'globe-network-icon 1.png',
    },
    {
      text: 'LANDING_PAGE.FEATURES.LEAVE_NOTHING_TO_CHANCE',
      icon: 'eye-icon 1.png',
    },
  ];

  uncertainties = [
    'LANDING_PAGE.UNCERTAINTIES.UNSTRUCTURED_DATA',
    'LANDING_PAGE.UNCERTAINTIES.SUPPLY_DEMAND',
    'LANDING_PAGE.UNCERTAINTIES.RISK_APPRAISAL',
    'LANDING_PAGE.UNCERTAINTIES.EXPOSURE_FRAUDS',
  ];

  isVisible = false;
  isVisible2 = false;

  @ViewChild('animatedSection', { static: false }) animatedSection!: ElementRef;
  @ViewChild('animatedSection2', { static: false })
  animatedSection2!: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === this.animatedSection.nativeElement) {
            this.isVisible = entry.isIntersecting;
            this.cdRef.detectChanges();
          }

          if (entry.target === this.animatedSection2.nativeElement) {
            this.isVisible2 = entry.isIntersecting;
            this.cdRef.detectChanges();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (this.animatedSection) {
      observer.observe(this.animatedSection.nativeElement);
    }

    if (this.animatedSection2) {
      observer.observe(this.animatedSection2.nativeElement);
    }
  }
}
