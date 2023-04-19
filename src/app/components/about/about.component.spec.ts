import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsService } from 'src/app/services/posts.service';
import { AuthorComponent } from '../author/author.component';
import { PostTitleComponent } from '../post-title/post-title.component';
import { PostComponent } from '../post/post.component';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AboutComponent,
        PostComponent,
        AuthorComponent,
        PostTitleComponent,
      ],
      imports: [HttpClientModule],
      providers: [PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
