import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopScreenComponent } from './shop-screen.component';

describe('ShopScreenComponent', () => {
  let component: ShopScreenComponent;
  let fixture: ComponentFixture<ShopScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
