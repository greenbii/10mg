import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusCancelledComponent } from './product-status-cancelled.component';

describe('ProductStatusCancelledComponent', () => {
  let component: ProductStatusCancelledComponent;
  let fixture: ComponentFixture<ProductStatusCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatusCancelledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStatusCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
