import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthlandingComponent } from './authlanding.component';

describe('AuthlandingComponent', () => {
  let component: AuthlandingComponent;
  let fixture: ComponentFixture<AuthlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthlandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
