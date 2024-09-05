import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  isMenuClosed = true;

  toggleMenu(): void {
    this.isMenuClosed = !this.isMenuClosed;
  }

  closeMenu(): void {
    this.isMenuClosed = true;
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
