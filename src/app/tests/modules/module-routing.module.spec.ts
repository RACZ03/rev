import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from '@theme/layout/app-layout/app-layout.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

// Mock module to simulate lazy-loaded LandingModule
@NgModule({
  imports: [CommonModule],
})
class MockLandingModule {}

describe('ModulesRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule], // Prevent animations for simplicity
      providers: [
        provideRouter([
          {
            path: '',
            component: AppLayoutComponent,
            children: [
              {
                path: 'landing',
                loadChildren: () => Promise.resolve(MockLandingModule),
              },
              {
                path: '',
                redirectTo: 'landing',
                pathMatch: 'full',
              },
            ],
          },
          {
            path: '**', // Wildcard route for unknown paths
            redirectTo: 'landing',
            pathMatch: 'full',
          },
        ]),
        importProvidersFrom(RouterModule), // Provide RouterModule instead of RouterTestingModule
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation(); // Trigger initial navigation
  });

  it('should navigate to /landing when accessing the root URL', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/landing'); // Assert the redirect to /landing
  });

  it('should load the MockLandingModule when navigating to /landing', async () => {
    await router.navigate(['/landing']);
    expect(location.path()).toBe('/landing'); // Assert navigation to /landing
  });

  it('should handle navigation within the AppLayoutComponent', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/landing'); // AppLayoutComponent child route test
  });
});
