import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoceComponent } from './edit-doce.component';

describe('EditDoceComponent', () => {
  let component: EditDoceComponent;
  let fixture: ComponentFixture<EditDoceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDoceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
