import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from '@app/config/routes/app.routes';
import { AppLayoutComponent } from '@theme/layout/app-layout/app-layout.component';
import { Component } from '@angular/core';

@Component({
  template: '',
})
class DummyComponent {}

describe('AppRoutingModule', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppLayoutComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: AppLayoutComponent,
            children: routes,
          },
          {
            path: 'dummy',
            component: DummyComponent,
          },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('should navigate to /modules/landing for undefined path (wildcard route)', fakeAsync(() => {
    router.navigate(['/undefined-path']);
    tick();
    expect(location.path()).toBe('/modules/landing');
  }));
});
