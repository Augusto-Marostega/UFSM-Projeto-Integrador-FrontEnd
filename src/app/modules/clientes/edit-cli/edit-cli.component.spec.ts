import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCliComponent } from './edit-cli.component';

describe('EditCliComponent', () => {
  let component: EditCliComponent;
  let fixture: ComponentFixture<EditCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
