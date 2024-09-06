import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuClosed = true;

  toggleMenu(): void {
    this.isMenuClosed = !this.isMenuClosed;
  }

  closeMenu(): void {
    this.isMenuClosed = true;
  }

  scrollToSection(section: string) {
    const element = document.getElementById(section) as HTMLElement | null;

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth' });
  }
}
