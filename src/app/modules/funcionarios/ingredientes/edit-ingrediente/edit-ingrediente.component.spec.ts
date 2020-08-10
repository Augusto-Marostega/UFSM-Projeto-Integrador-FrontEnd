import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngredienteComponent } from './edit-ingrediente.component';

describe('EditIngredienteComponent', () => {
  let component: EditIngredienteComponent;
  let fixture: ComponentFixture<EditIngredienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIngredienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
