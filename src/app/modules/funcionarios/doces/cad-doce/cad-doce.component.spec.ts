import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadDoceComponent } from './cad-doce.component';

describe('CadDoceComponent', () => {
  let component: CadDoceComponent;
  let fixture: ComponentFixture<CadDoceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadDoceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadDoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
