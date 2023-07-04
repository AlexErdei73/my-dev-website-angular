import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { CardComponent } from '../card/card.component';
import { ErrorDlgComponent } from '../error-dlg/error-dlg.component';
import { ModalComponent } from '../modal/modal.component';

import { PostsComponent } from './posts.component';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { Variant } from '../card/card';
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

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostsComponent,
        CardComponent,
        ModalComponent,
        ErrorDlgComponent,
      ],
      imports: [HttpClientModule],
      providers: [PostsService, LoginService, Router],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    component.posts = _posts;
    component.edit = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two posts with the right titles', () => {
    const h2Elements = fixture.nativeElement.querySelectorAll('h2');
    expect(h2Elements.length).toBe(2);
    h2Elements.forEach((element: HTMLElement, index: number) => {
      expect(element.textContent).toContain(_posts[index].title);
    });
  });

  it('should render two View buttons', () => {
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    expect(btnElements.length).toBe(2);
    btnElements.forEach((element: HTMLElement, index: number) => {
      expect(element.textContent).toContain('View');
    });
  });

  it('should have getPostCard function to get input object for PostCard component', () => {
    const post = _posts[0];
    const postCardInput = {
      variant: Variant.normal,
      headerTextLeft: 'By test username',
      headerTextRight: 'Likes: 0',
      footerTextLeft: 'Created:29/04/2023',
      footerTextRight: 'Updated:30/04/2023',
    };
    expect(component.getPostCard(post)).toEqual(postCardInput);
  });
});
