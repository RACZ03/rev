import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuClosed = true;
  isMarketsSubMenuOpen = false;
  isTechSubMenuOpen = false;
  isScrolled = false;
  scrollOpacity = 0;

  constructor(
    public elementRef: ElementRef,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.isMenuClosed = !this.isMenuClosed;
  }

  closeMenu(): void {
    this.isMenuClosed = true;
  }

  toggleMarketsSubMenu(): void {
    this.isMarketsSubMenuOpen = !this.isMarketsSubMenuOpen;
  }

  toggleTechSubMenu(): void {
    this.isTechSubMenuOpen = !this.isTechSubMenuOpen;
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section) as HTMLElement | null;
    if (!element) {
      return;
    }
    element.scrollIntoView({ behavior: 'smooth' });
  }

  navigateHome(): void {
    if (this.router.url === '/modules/landing') {
      if (window.scrollY > window.innerHeight) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    this.router.navigate(['/modules/landing']);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    if (scrollTop < windowHeight * 0.005) {
      this.scrollOpacity = 0;
    } else if (scrollTop < windowHeight) {
      this.scrollOpacity =
        (scrollTop - windowHeight * 0.005) / (windowHeight * 0.99);
    } else {
      this.scrollOpacity = 1;
    }
  }
}
