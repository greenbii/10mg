import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsettingsComponent } from './notificationsettings.component';

describe('NotificationsettingsComponent', () => {
  let component: NotificationsettingsComponent;
  let fixture: ComponentFixture<NotificationsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
