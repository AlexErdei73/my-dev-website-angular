import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';

import { EditBlockComponent } from './edit-block.component';

describe('EditBlockComponent', () => {
  let component: EditBlockComponent;
  let fixture: ComponentFixture<EditBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBlockComponent, ErrorMsgComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBlockComponent);
    component = fixture.componentInstance;
    component.block = {
      _id: '',
      type: 'paragraph',
      language: '',
      links: [],
      text: 'Test Block Paragraph',
      post: '',
    };
    component.errors = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
