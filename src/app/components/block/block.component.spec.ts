import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { EditBlockComponent } from '../edit-block/edit-block.component';

import { BlockComponent } from './block.component';

describe('BlockComponent', () => {
  let component: BlockComponent;
  let fixture: ComponentFixture<BlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockComponent, EditBlockComponent],
      imports: [HttpClientModule],
      providers: [LoginService, PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockComponent);
    component = fixture.componentInstance;
    component.block = {
      _id: '',
      type: 'paragraph',
      text: 'Test Paragraph Block',
      post: '',
      language: ' ',
      links: [],
    };
    component.edit = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
