import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSemLoginComponent } from './nav-sem-login.component';

describe('NavSemLoginComponent', () => {
  let component: NavSemLoginComponent;
  let fixture: ComponentFixture<NavSemLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavSemLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSemLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
