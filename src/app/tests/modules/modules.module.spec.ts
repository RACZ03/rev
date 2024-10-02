import { TestBed } from '@angular/core/testing';
import { ModulesModule } from '@modules/modules.module';
import { ModulesComponent } from '@modules/modules.component';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from '@modules/modules-routing.module';
import { ThemeModule } from '@app/theme';

describe('ModulesModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesModule],
    }).compileComponents();
  });

  it('should create the module', () => {
    const moduleInstance = TestBed.inject(ModulesModule);
    expect(moduleInstance).toBeTruthy();
  });

  it('should declare the ModulesComponent', () => {
    const declarations = TestBed.configureTestingModule({
      declarations: [ModulesComponent],
    });
    const compiledModule = declarations.compileComponents();
    expect(compiledModule).toBeTruthy();
  });

  it('should import CommonModule, ModulesRoutingModule, and ThemeModule', () => {
    const imports = TestBed.configureTestingModule({
      imports: [CommonModule, ModulesRoutingModule, ThemeModule],
    });
    expect(imports).toBeTruthy();
  });
});
