import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedclientsComponent } from './trustedclients.component';

describe('TrustedclientsComponent', () => {
  let component: TrustedclientsComponent;
  let fixture: ComponentFixture<TrustedclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedclientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
