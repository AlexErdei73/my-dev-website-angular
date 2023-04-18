import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDlgComponent } from './error-dlg.component';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from '../modal/modal.component';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';

describe('ErrorDlgComponent', () => {
  let component: ErrorDlgComponent;
  let fixture: ComponentFixture<ErrorDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDlgComponent, ModalComponent, ErrorMsgComponent],
      imports: [HttpClientModule],
      providers: [PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorDlgComponent);
    component = fixture.componentInstance;
    component.error = { msg: 'Test Error Message' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
