import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDlgComponent } from './error-dlg.component';

describe('ErrorDlgComponent', () => {
  let component: ErrorDlgComponent;
  let fixture: ComponentFixture<ErrorDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorDlgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
