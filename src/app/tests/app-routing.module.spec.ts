import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

// Mock module to simulate lazy-loaded ModulesModule
@NgModule({
  imports: [CommonModule],
})
class MockModulesModule {}

describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule], // Prevent animations for simplicity
      providers: [
        provideRouter([
          {
            path: 'modules',
            loadChildren: () => Promise.resolve(MockModulesModule),
          },
          { path: '', redirectTo: 'modules', pathMatch: 'full' },
          { path: '**', redirectTo: 'modules' }, // Wildcard route
        ]),
        importProvidersFrom(RouterModule), // Use RouterModule instead of RouterTestingModule
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation(); // Trigger initial navigation
  });

  it('should navigate to /modules when accessing the root URL', async () => {
    await router.navigate(['']);
    expect(location.path()).toBe('/modules'); // Assert the redirect to /modules
  });

  it('should redirect unknown paths to /modules', async () => {
    await router.navigate(['/unknown']);
    expect(location.path()).toBe('/modules'); // Wildcard redirect
  });

  it('should load the MockModulesModule when navigating to /modules', async () => {
    await router.navigate(['/modules']);
    expect(location.path()).toBe('/modules'); // Assert navigation to /modules
  });
});
