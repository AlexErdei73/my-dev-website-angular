import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { map, Observable, of } from 'rxjs';
import { User } from '../model/user';
import { Block } from '../model/block';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _BASE_URL = 'https://blog-api.alexerdei.co.uk';
  private _posts!: Observable<Post[]>;
  private _postsArray!: Post[];
  private _currentPost!: Post;
  private _edit = false;
  private _errors: { msg: string }[] = [];
  private _success = false;
  private _aboutPost!: Post;
  private _ABOUT_POST = '64b3b9fc11a583b26b48b476';
  private _EMPTY_AUTHOR: User = {
    _id: '',
    username: '...Loading',
    password: '',
    hash: '',
    isAdmin: false,
    jobTitle: '',
    bio: '',
    name: '',
  };
  private _EMPTY_POST: Post = {
    _id: '',
    author: this._EMPTY_AUTHOR,
    title: '...Loading',
    content: [],
    comments: [],
    likes: [],
    published: false,
    createdAt: '',
    updatedAt: '',
  };
  showErrorDlg = false;

  constructor(
    private http: HttpClient,
    private errorHandling: ErrorHandlingService
  ) {
    this._currentPost = this._EMPTY_POST;
    this._aboutPost = this._EMPTY_POST;
    this.fetchPosts();
    this._posts.subscribe({
      next: (posts) => {
        const aboutPost = posts.find((post) => post._id === this._ABOUT_POST);
        if (aboutPost) {
          this._aboutPost = aboutPost;
          this._currentPost = aboutPost;
        }
        this._postsArray = posts;
      },
      error: (err) => {
        this.errorHandling.handleErrors(err, this.handleErrorCallBack);
      },
    });
  }

  fetchPosts() {
    this._posts = this.http
      .get<{ success: boolean; posts: Post[]; errors: [] }>(
        `${this._BASE_URL}/posts`
      )
      .pipe(map((res) => res.posts));
  }

  get posts(): Observable<Post[]> {
    return this._posts;
  }

  set currentPost(post: Post) {
    this._currentPost = post;
  }

  get currentPost(): Post {
    return this._currentPost;
  }

  get errors() {
    return this._errors;
  }

  set errors(err) {
    this._errors = err;
  }

  get success() {
    return this._success;
  }

  set success(success) {
    this._success = success;
  }

  get edit() {
    return this._edit;
  }

  set edit(edit: boolean) {
    this._edit = edit;
  }

  get aboutPost() {
    return this._aboutPost;
  }

  deleteResponse() {
    this._success = false;
    this._errors = [];
  }

  private handleErrorCallBack = (errors: { msg: string }[]) => {
    this._errors = errors;
    this.showErrorDlg = true;
    console.error(errors[0].msg);
  };

  toggleLike(post: Post, user: User) {
    this.http
      .put<{ success: boolean; posts: Post[]; errors: [{ msg: string }] }>(
        `${this._BASE_URL}/posts/${post._id}/likes`,
        { user: user._id }
      )
      .subscribe({
        next: (res) => {
          const index = post.likes.indexOf(user._id);
          index === -1
            ? post.likes.push(user._id)
            : post.likes.splice(index, 1);
        },
        error: (err) =>
          this.errorHandling.handleErrors(err, this.handleErrorCallBack),
      });
  }

  togglePublish(post: Post, token: string) {
    this.http
      .put<{ success: boolean; post: Post; errors: [{ msg: string }] }>(
        `${this._BASE_URL}/posts/${post._id}`,
        {
          ...post,
          published: !post.published,
        },
        { headers: { ['Authorization']: token } }
      )
      .subscribe({
        next: () => {
          post.published = !post.published;
        },
        error: (err) =>
          this.errorHandling.handleErrors(err, this.handleErrorCallBack),
      });
  }

  deletePost(token: string) {
    return this.http.delete<{
      success: boolean;
      post: Post;
      errors: { msg: string }[];
    }>(`${this._BASE_URL}/posts/${(this._currentPost as any as Post)._id}`, {
      headers: { ['Authorization']: token },
    });
  }

  postPost(post: any, token: string) {
    this.deleteResponse();
    return this.http.post<{
      success: boolean;
      post: Post;
      errors: { msg: string }[];
    }>(`${this._BASE_URL}/posts`, post, {
      headers: { ['Authorization']: token },
    });
  }

  updatePost(post: any, token: string) {
    this.deleteResponse();
    return this.http.put<{
      success: boolean;
      post: Post;
      errors: { msg: string }[];
    }>(`${this._BASE_URL}/posts/${post._id}`, post, {
      headers: { ['Authorization']: token },
    });
  }

  deleteBlock(block: Block, token: string) {
    this.deleteResponse();
    return this.http.delete<{
      success: boolean;
      block: Block;
      errors: { msg: string }[];
    }>(`${this._BASE_URL}/posts/${block.post}/blocks/${block._id}`, {
      headers: { ['Authorization']: token },
    });
  }

  saveBlock(block: Block, token: string) {
    this.deleteResponse();
    return this.http.post<{
      success: boolean;
      block: Block;
      errors: { msg: string }[];
    }>(`${this._BASE_URL}/posts/${block.post}/blocks`, block, {
      headers: { ['Authorization']: token },
    });
  }

  updateBlock(block: Block, token: string) {
    this.deleteResponse();
    return this.http.put<{
      success: boolean;
      block: Block;
      errors: { msg: string }[];
    }>(`${this._BASE_URL}/posts/${block.post}/blocks/${block._id}`, block, {
      headers: { ['Authorization']: token },
    });
  }

  addPost(post: Post) {
    this._postsArray.push(post);
    this._posts = of(this._postsArray);
  }

  removePost(post: Post) {
    const index = this._postsArray.findIndex(
      (element) => element._id === post._id
    );
    this._postsArray.splice(index, 1);
    this._posts = of(this._postsArray);
  }

  closeErrorDlg(): void {
    this.showErrorDlg = false;
  }
}
