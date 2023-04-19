import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

import { PostTitleComponent } from './post-title.component';

describe('PostTitleComponent', () => {
  let component: PostTitleComponent;
  let fixture: ComponentFixture<PostTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostTitleComponent],
      imports: [HttpClientModule],
      providers: [LoginService, PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(PostTitleComponent);
    component = fixture.componentInstance;
    component.post = {
      _id: '',
      title: 'Test Post',
      author: '',
      content: [],
      comments: [],
      likes: [],
      published: false,
      createdAt: '',
      updatedAt: '',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
