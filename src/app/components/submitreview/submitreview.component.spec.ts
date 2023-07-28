import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitreviewComponent } from './submitreview.component';

describe('SubmitreviewComponent', () => {
  let component: SubmitreviewComponent;
  let fixture: ComponentFixture<SubmitreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
