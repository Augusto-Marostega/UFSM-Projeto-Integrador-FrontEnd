import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadIngredienteComponent } from './cad-ingrediente.component';

describe('CadIngredienteComponent', () => {
  let component: CadIngredienteComponent;
  let fixture: ComponentFixture<CadIngredienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadIngredienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
