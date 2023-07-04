import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { PostsService } from 'src/app/services/posts.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Post } from 'src/app/model/post';
let testUser;
let _posts: Post[];

testUser = {
  _id: '63ab6c333bbf8653df7e1175',
  username: 'test username',
  password: '',
  hash: '',
  isAdmin: false,
  jobTitle: 'test job',
  bio: 'test bio',
  name: 'test name',
};

_posts = [
  {
    _id: '644d140eefc2a3029df284e2',
    author: testUser,
    title: 'test post',
    content: [],
    comments: [],
    likes: [],
    published: true,
    createdAt: '29/04/2023',
    updatedAt: '30/04/2023',
  },
  {
    _id: '644d35f7efc2a3029df288cb',
    author: testUser,
    title: 'About',
    content: [],
    comments: [],
    likes: [],
    published: false,
    createdAt: '29/04/2023',
    updatedAt: '30/04/2023',
  },
];

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    // Create a fake postsService object with a `get posts()` spy
    const postsService = jasmine.createSpyObj('PostsService', [], {
      posts: of(_posts),
    });

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [],
      providers: [{ provide: PostsService, useValue: postsService }],
      schemas: [NO_ERRORS_SCHEMA],
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
      expect(component.publishedPosts()[0].title).toBe(_posts[0].title);
    });
  }));
});
