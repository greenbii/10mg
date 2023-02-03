import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierlandingComponent } from './supplierlanding.component';

describe('SupplierlandingComponent', () => {
  let component: SupplierlandingComponent;
  let fixture: ComponentFixture<SupplierlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierlandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
