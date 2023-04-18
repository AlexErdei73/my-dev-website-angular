import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from '../author/author.component';
import { PostTitleComponent } from '../post-title/post-title.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent, AuthorComponent, PostTitleComponent],
      imports: [HttpClientModule],
      providers: [PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
