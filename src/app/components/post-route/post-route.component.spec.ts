import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorComponent } from '../author/author.component';
import { PostTitleComponent } from '../post-title/post-title.component';
import { PostComponent } from '../post/post.component';

import { PostRouteComponent } from './post-route.component';

describe('PostRouteComponent', () => {
  let component: PostRouteComponent;
  let fixture: ComponentFixture<PostRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostRouteComponent,
        PostComponent,
        AuthorComponent,
        PostTitleComponent,
      ],
      imports: [HttpClientModule],
      providers: [PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(PostRouteComponent);
    component = fixture.componentInstance;
    component.currentPost = {
      _id: '',
      title: 'Test Post',
      author: '',
      content: [],
      likes: [],
      comments: [],
      published: false,
      createdAt: '',
      updatedAt: '',
    };
    component.edit = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
