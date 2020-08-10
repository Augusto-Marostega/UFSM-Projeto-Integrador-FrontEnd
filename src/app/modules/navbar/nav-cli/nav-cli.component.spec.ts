import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCliComponent } from './nav-cli.component';

describe('NavCliComponent', () => {
  let component: NavCliComponent;
  let fixture: ComponentFixture<NavCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
