import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackProductComponent } from './track-product.component';

describe('TrackProductComponent', () => {
  let component: TrackProductComponent;
  let fixture: ComponentFixture<TrackProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
