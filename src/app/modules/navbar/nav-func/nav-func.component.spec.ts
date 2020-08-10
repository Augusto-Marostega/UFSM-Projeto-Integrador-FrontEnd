import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFuncComponent } from './nav-func.component';

describe('NavFuncComponent', () => {
  let component: NavFuncComponent;
  let fixture: ComponentFixture<NavFuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
