import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from '../posts/posts.component';
import { ModalComponent } from '../modal/modal.component';
import { CardComponent } from '../card/card.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PostsComponent,
        ModalComponent,
        CardComponent,
      ],
      imports: [HttpClientModule],
      providers: [PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('it should have 2 posts', waitForAsync(() => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.posts.length).toBe(2);
    });
  }));

  it('it should have one publish post with "Arrow functions in JavaScript" title ', waitForAsync(() => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.publishedPosts().length).toBe(1);
      expect(component.publishedPosts()[0].title).toBe(
        'Arrow functions in JavaScript'
      );
    });
  }));
});
