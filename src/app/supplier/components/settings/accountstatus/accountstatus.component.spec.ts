import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountstatusComponent } from './accountstatus.component';

describe('AccountstatusComponent', () => {
  let component: AccountstatusComponent;
  let fixture: ComponentFixture<AccountstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
