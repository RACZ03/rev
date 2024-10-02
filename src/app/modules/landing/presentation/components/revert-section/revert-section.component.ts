import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-revert-section',
  templateUrl: './revert-section.component.html',
})
export class RevertSectionComponent implements AfterViewInit {
  isVisible = false;
  revertItems = [
    {
      title: 'LANDING_PAGE.REVERT.SELLERS_TITLE',
      image: './assets/img/revert/mobile-no-signal-icon 1.png',
      items: [
        'LANDING_PAGE.REVERT.SELLERS_ITEM_1',
        'LANDING_PAGE.REVERT.SELLERS_ITEM_2',
        'LANDING_PAGE.REVERT.SELLERS_ITEM_3',
      ],
    },
    {
      title: 'LANDING_PAGE.REVERT.BROKERS_TRADERS_TITLE',
      image: './assets/img/revert/cell-molecule-icon 1.png',
      items: [
        'LANDING_PAGE.REVERT.BROKERS_TRADERS_ITEM_1',
        'LANDING_PAGE.REVERT.BROKERS_TRADERS_ITEM_2',
      ],
    },
    {
      title: 'LANDING_PAGE.REVERT.BUYERS_TITLE',
      image: './assets/img/revert/world-globe-line-icon 1.png',
      items: ['LANDING_PAGE.REVERT.BUYERS_ITEM_1'],
    },
    {
      title: 'LANDING_PAGE.REVERT.CREDIT_TITLE',
      image: './assets/img/revert/Group.png',
      items: [
        'LANDING_PAGE.REVERT.CREDIT_ITEM_1',
        'LANDING_PAGE.REVERT.CREDIT_ITEM_2',
      ],
    },
  ];

  @ViewChild('revert', { static: false }) animatedSection!: ElementRef;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === this.animatedSection.nativeElement) {
            this.isVisible = entry.isIntersecting;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (this.animatedSection) {
      observer.observe(this.animatedSection.nativeElement);
    }
  }
}
