import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeSupplierLandingComponent } from './become-supplier-landing.component';

describe('BecomeSupplierLandingComponent', () => {
  let component: BecomeSupplierLandingComponent;
  let fixture: ComponentFixture<BecomeSupplierLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeSupplierLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeSupplierLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
