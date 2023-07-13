import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { CardComponent } from '../card/card.component';
import { PostsComponent } from './posts.component';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { Variant } from '../card/card';
import { Login } from 'src/app/model/login';
import { of } from 'rxjs';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
let testUser: User;
let _posts: Post[];
let loginState: Login;

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

loginState = {
  success: false,
  password: '',
  user: testUser,
  token: 'test token',
  msg: '',
};

@Component({
  selector: 'app-modal',
  template: '<div *ngIf="show"><ng-content></ng-content></div>',
})
class ModalStubComponent {
  @Input() show!: boolean;
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  const postsService = jasmine.createSpyObj(
    'PostsService',
    ['toggleLike', 'togglePublish', 'deletePost', 'removePost'],
    { posts: of(_posts), errors: [], currentPost: _posts[0] }
  );

  const loginService = jasmine.createSpyObj('LoginService', [], {
    state: loginState,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent, CardComponent, ModalStubComponent],
      providers: [
        { provide: PostsService, useValue: postsService },
        { provide: LoginService, useValue: loginService },
        provideRouter([{ path: '**', component: PostsComponent }]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    component.posts = _posts;
    component.edit = false;
    loginState.success = false;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
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

  it('should route to the right post when View button clicked', async () => {
    const postIndex = 0;
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    await btnElements[postIndex].click();
    expect(
      Object.getOwnPropertyDescriptor(postsService, 'currentPost')?.set
    ).toHaveBeenCalledWith(_posts[postIndex]);
    expect(TestBed.inject(Router).url).toEqual('/post');
  });

  it('should render two Like buttons if user is logged in', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    fixture.detectChanges();
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    expect(btnElements.length).toBe(4);
    const likeBtnElements = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (btn.textContent!.indexOf('Like') > -1) likeBtnElements.push(btn);
    });
    expect(likeBtnElements.length).toBe(2);
  });

  it('should call toggleLike with the right post and user when Like button clicked', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    fixture.detectChanges();
    const postIndex = 0;
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    const likeBtnElements: HTMLButtonElement[] = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (btn.textContent!.indexOf('Like') > -1) likeBtnElements.push(btn);
    });
    likeBtnElements[postIndex].click();
    expect(postsService.toggleLike).toHaveBeenCalledWith(
      _posts[postIndex],
      testUser
    );
  });

  it('should render two Publish/Hide buttons if user is logged in and edits', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    component.edit = true;
    fixture.detectChanges();
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    expect(btnElements.length).toBe(6);
    const publishBtnElements = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (
        btn.textContent!.indexOf('Publish') > -1 ||
        btn.textContent!.indexOf('Hide') > -1
      )
        publishBtnElements.push(btn);
    });
    expect(publishBtnElements.length).toBe(2);
  });

  it('should call togglePublish with the right post when edits and Publish/Hide button clicked', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    component.edit = true;
    fixture.detectChanges();
    const postIndex = 0;
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    const publishBtnElements: HTMLButtonElement[] = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (
        btn.textContent!.indexOf('Publish') > -1 ||
        btn.textContent!.indexOf('Hide') > -1
      )
        publishBtnElements.push(btn);
    });
    publishBtnElements[postIndex].click();
    expect(postsService.togglePublish).toHaveBeenCalledWith(
      _posts[postIndex],
      loginService.state.token
    );
  });

  it('should render two Delete buttons if user is logged in and edits', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    component.edit = true;
    fixture.detectChanges();
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    expect(btnElements.length).toBe(6);
    const deleteBtnElements = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (btn.textContent!.indexOf('Delete') > -1) deleteBtnElements.push(btn);
    });
    expect(deleteBtnElements.length).toBe(2);
  });

  it('should open modal with when edits and Delete button clicked', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    component.edit = true;
    fixture.detectChanges();
    const postIndex = 0;
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    const deleteBtnElements: HTMLButtonElement[] = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (btn.textContent!.indexOf('Delete') > -1) deleteBtnElements.push(btn);
    });
    deleteBtnElements[postIndex].click();
    expect(component.showModal).toBe(true);
    expect(
      Object.getOwnPropertyDescriptor(postsService, 'currentPost')!.set
    ).toHaveBeenCalledWith(_posts[postIndex]);
    expect(
      Object.getOwnPropertyDescriptor(postsService, 'errors')!.set
    ).toHaveBeenCalledWith([]);
  });

  it('should call deletePost when modal is open and Delete btn clicked', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    component.edit = true;
    component.showModal = true;
    fixture.detectChanges();
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    const deleteBtnElements: HTMLButtonElement[] = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (btn.textContent!.indexOf('Delete') > -1) deleteBtnElements.push(btn);
    });
    expect(deleteBtnElements.length).toBe(3);
    deleteBtnElements[2].click();
    expect(postsService.deletePost).toHaveBeenCalledWith(
      loginService.state.token
    );
  });

  it('should close open modal when Cancel btn clicked', () => {
    loginState.success = true;
    (
      Object.getOwnPropertyDescriptor(loginService, 'state')!.get as jasmine.Spy
    ).and.returnValue(loginState);
    component.edit = true;
    component.showModal = true;
    fixture.detectChanges();
    const btnElements = fixture.nativeElement.querySelectorAll('button');
    const cancelBtnElements: HTMLButtonElement[] = [];
    btnElements.forEach((btn: HTMLButtonElement) => {
      if (btn.textContent!.indexOf('Cancel') > -1) cancelBtnElements.push(btn);
    });
    expect(cancelBtnElements.length).toBe(1);
    cancelBtnElements[0].click();
    expect(component.showModal).toBe(false);
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
