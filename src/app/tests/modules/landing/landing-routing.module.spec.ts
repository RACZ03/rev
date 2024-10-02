import { TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '@modules/landing/presentation/pages/landing/landing.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LandingRoutingModule } from '@modules/landing/landing-routing.module';

describe('LandingRoutingModule', () => {
  let location: Location;
  let router: Router;

  const routes: Routes = [
    { path: 'modules/landing', component: LandingComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes), LandingRoutingModule],
      declarations: [LandingComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to /modules/landing', async () => {
    await router.navigate(['modules/landing']);
    expect(location.path()).toBe('/modules/landing');
  });
});
