import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusCompletedComponent } from './product-status-completed.component';

describe('ProductStatusCompletedComponent', () => {
  let component: ProductStatusCompletedComponent;
  let fixture: ComponentFixture<ProductStatusCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatusCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStatusCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
