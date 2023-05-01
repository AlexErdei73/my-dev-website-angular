import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { ErrorHandlingService } from './error-handling.service';
// Http testing module and mocking controller
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Post } from '../model/post';

describe('PostsService', () => {
  let service: PostsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let testUser: User;
  let testPost: Post;
  let testAboutPost: Post;
  let newPost: Post;
  let testPosts: Post[];
  let baseUrl = 'https://radiant-crag-39178.herokuapp.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ErrorHandlingService],
    });
    service = TestBed.inject(PostsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

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
    testPost = {
      _id: '644d140eefc2a3029df284e2',
      author: testUser,
      title: 'test post',
      content: [],
      comments: [],
      likes: [],
      published: true,
      createdAt: '29/04/2023',
      updatedAt: '30/04/2023',
    };
    testAboutPost = {
      _id: '644d35f7efc2a3029df288cb',
      author: testUser,
      title: 'About',
      content: [],
      comments: [],
      likes: [],
      published: false,
      createdAt: '29/04/2023',
      updatedAt: '30/04/2023',
    };
    newPost = {
      _id: '',
      author: testUser,
      title: 'test post',
      content: [],
      comments: [],
      likes: [],
      published: false,
      createdAt: '29/04/2023',
      updatedAt: '30/04/2023',
    };
    testPosts = [testPost, testAboutPost];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');

    req.flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should have posts', () => {
    service.posts.subscribe((posts) => {
      expect(posts).toEqual(testPosts);
    });

    const requests = httpTestingController.match(`${baseUrl}/posts`);
    expect(requests.length).toBe(2);
    expect(requests[0].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');

    requests[0].flush({ success: true, posts: testPosts, errors: [] });
    requests[1].flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should have currentPost as testPost', () => {
    service.posts.subscribe((posts) => {
      expect(service.currentPost).toEqual(testPost);
    });

    const requests = httpTestingController.match(`${baseUrl}/posts`);
    expect(requests.length).toBe(2);
    expect(requests[0].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');

    requests[0].flush({ success: true, posts: testPosts, errors: [] });
    requests[1].flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should have aboutPost as testAboutPost', () => {
    service.posts.subscribe((posts) => {
      expect(service.aboutPost).toEqual(testAboutPost);
    });

    const requests = httpTestingController.match(`${baseUrl}/posts`);
    expect(requests.length).toBe(2);
    expect(requests[0].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');

    requests[0].flush({ success: true, posts: testPosts, errors: [] });
    requests[1].flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should post new post', () => {
    const response = service.postPost(newPost, 'empty token');
    response.subscribe((res) => {
      expect(res.success).toBe(true);
      expect(res.post).toEqual(newPost);
      expect(res.errors).toEqual([]);
    });

    const requests = httpTestingController.match(`${baseUrl}/posts`);
    expect(requests.length).toBe(2);
    expect(requests[0].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('POST');

    requests[0].flush({ success: true, posts: testPosts, errors: [] });
    requests[1].flush({ success: true, post: newPost, errors: [] });
  });

  it('should add new post', () => {
    const newPosts = testPosts;
    newPosts.push(newPost);

    service.addPost(newPost);
    service.posts.subscribe((posts) => {
      expect(posts).toEqual(newPosts);
    });

    const requests = httpTestingController.match(`${baseUrl}/posts`);
    expect(requests.length).toBe(3);
    expect(requests[0].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');

    requests[0].flush({ success: true, posts: testPosts, errors: [] });
    requests[1].flush({ success: true, posts: testPosts, errors: [] });
    requests[2].flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should delete post', () => {
    const response = service.deletePost('empty token');
    response.subscribe((res) => {
      expect(res.success).toBe(true);
      expect(res.post).toEqual(service.currentPost);
      expect(res.errors).toEqual([]);
    });

    const reqDelete = httpTestingController.expectOne(
      `${baseUrl}/posts/${service.currentPost._id}`
    );
    expect(reqDelete.request.method).toBe('DELETE');
    reqDelete.flush({ success: true, post: service.currentPost, errors: [] });

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should remove post', () => {
    const newPosts = [testAboutPost];

    service.removePost(testPost);
    service.posts.subscribe((posts) => {
      expect(posts).toEqual(newPosts);
    });

    const requests = httpTestingController.match(`${baseUrl}/posts`);
    expect(requests.length).toBe(3);
    expect(requests[0].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');

    requests[0].flush({ success: true, posts: testPosts, errors: [] });
    requests[1].flush({ success: true, posts: testPosts, errors: [] });
    requests[2].flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should toggle published property of post', () => {
    const newTestPost = { ...testPost };
    newTestPost.published = !newTestPost.published;

    service.togglePublish(testPost, 'empty token');

    const reqPUT = httpTestingController.expectOne(
      `${baseUrl}/posts/${testPost._id}`
    );
    expect(reqPUT.request.method).toBe('PUT');
    expect(reqPUT.request.body).toEqual(newTestPost);
    reqPUT.flush({ success: true, post: testPost, errors: [] });

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, posts: testPosts, errors: [] });
  });
});
