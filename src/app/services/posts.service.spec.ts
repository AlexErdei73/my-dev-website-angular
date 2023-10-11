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
import { Block } from '../model/block';

describe('PostsService', () => {
  let service: PostsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let testUser: User;
  let testPost: Post;
  let testAboutPost: Post;
  let newPost: Post;
  let testPosts: Post[];
  let testBlock: Block;
  let baseUrl = 'https://blog-api.alexerdei.co.uk';

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
      _id: '64b3b9fc11a583b26b48b476',
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
    testBlock = {
      _id: '645d140abfc2a1029df283f1',
      post: testPost._id,
      type: 'paragraph',
      text: 'test block text',
      language: ' ',
      links: [],
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

  it('should have currentPost as testAboutPost', () => {
    service.posts.subscribe((posts) => {
      expect(service.currentPost).toEqual(testAboutPost);
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
    service.posts.subscribe((posts) => {
      service.addPost(newPost);
    });

    const newPosts = [...testPosts];
    newPosts.push(newPost);

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

    service.posts.subscribe((posts) => {
      service.removePost(testPost);
    });

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

  it('should add like of user to post', () => {
    const newTestPost = { ...testPost };
    newTestPost.likes.push(testUser._id);

    service.toggleLike(testPost, testUser);
    expect(testPost).toEqual(newTestPost);

    const reqPUT = httpTestingController.expectOne(
      `${baseUrl}/posts/${testPost._id}/likes`
    );
    expect(reqPUT.request.method).toBe('PUT');
    expect(reqPUT.request.body).toEqual({ user: testUser._id });
    reqPUT.flush({ success: true, posts: testPosts, errors: [] });

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should remove like of user from post', () => {
    const newTestPost = { ...testPost };
    testPost.likes.push(testUser._id);

    service.toggleLike(testPost, testUser);
    expect(testPost).toEqual(newTestPost);

    const reqPUT = httpTestingController.expectOne(
      `${baseUrl}/posts/${testPost._id}/likes`
    );
    expect(reqPUT.request.method).toBe('PUT');
    expect(reqPUT.request.body).toEqual({ user: testUser._id });
    reqPUT.flush({ success: true, posts: testPosts, errors: [] });

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should save block', () => {
    const res = service.saveBlock(testBlock, 'empty token');
    res.subscribe((res) => {
      expect(res).toEqual({
        success: true,
        block: testBlock,
        errors: [],
      });
    });

    const reqPOST = httpTestingController.expectOne(
      `${baseUrl}/posts/${testPost._id}/blocks`
    );
    expect(reqPOST.request.method).toBe('POST');
    expect(reqPOST.request.body).toEqual(testBlock);
    reqPOST.flush({ success: true, block: testBlock, errors: [] });

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should delete block', () => {
    const res = service.deleteBlock(testBlock, 'empty token');
    res.subscribe((res) => {
      expect(res).toEqual({
        success: true,
        block: testBlock,
        errors: [],
      });
    });

    const reqDELETE = httpTestingController.expectOne(
      `${baseUrl}/posts/${testPost._id}/blocks/${testBlock._id}`
    );
    expect(reqDELETE.request.method).toBe('DELETE');
    reqDELETE.flush({ success: true, block: testBlock, errors: [] });

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should update block', () => {
    const updatedBlock = { ...testBlock };
    updatedBlock.text = 'updated text';

    const res = service.updateBlock(updatedBlock, 'empty token');
    res.subscribe((res) => {
      expect(res).toEqual({
        success: true,
        block: testBlock,
        errors: [],
      });
    });

    const reqPUT = httpTestingController.expectOne(
      `${baseUrl}/posts/${testPost._id}/blocks/${testBlock._id}`
    );
    expect(reqPUT.request.method).toBe('PUT');
    expect(reqPUT.request.body).toEqual(updatedBlock);
    reqPUT.flush({ success: true, block: testBlock, errors: [] });

    const req = httpTestingController.expectOne(`${baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush({ success: true, posts: testPosts, errors: [] });
  });

  it('should handle http error at loading', () => {
    const emptyUser: User = {
      _id: '',
      username: '...Loading',
      password: '',
      hash: '',
      isAdmin: false,
      name: '',
      jobTitle: '',
      bio: '',
    };
    const emptyPost: Post = {
      _id: '',
      author: emptyUser,
      title: '...Loading',
      content: [],
      comments: [],
      likes: [],
      published: false,
      createdAt: '',
      updatedAt: '',
    };

    const mockError = new ProgressEvent('error');

    service.posts.subscribe({
      next: (posts) => {
        expect(posts).toEqual([emptyPost]);
      },
      error: (err) => {
        expect(err.error).toBe(mockError);
      },
    });

    const requests = httpTestingController.match(`${baseUrl}/posts`);
    expect(requests.length).toBe(2);
    expect(requests[0].request.method).toBe('GET');
    expect(requests[1].request.method).toBe('GET');

    requests[0].error(mockError);
    requests[1].error(mockError);
  });
});
