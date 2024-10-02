import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ModulesComponent } from '@modules/modules.component';
import { provideRouter } from '@angular/router';
import { routes } from '@app/config/routes/module.routes';
import { RouterModule } from '@angular/router';

describe('ModulesComponent', () => {
  let fixture: ComponentFixture<ModulesComponent>;
  let component: ModulesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulesComponent],
      imports: [RouterModule],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ModulesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).not.toBeNull();
  });
});
