/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from '@app/modules/landing/presentation/pages/landing/landing.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;

    spyOn(window as any, 'initFlowbite').and.callThrough();

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
