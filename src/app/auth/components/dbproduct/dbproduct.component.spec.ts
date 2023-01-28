import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbproductComponent } from './dbproduct.component';

describe('DbproductComponent', () => {
  let component: DbproductComponent;
  let fixture: ComponentFixture<DbproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
