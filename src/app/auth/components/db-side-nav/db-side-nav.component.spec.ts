import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSideNavComponent } from './db-side-nav.component';

describe('DbSideNavComponent', () => {
  let component: DbSideNavComponent;
  let fixture: ComponentFixture<DbSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
