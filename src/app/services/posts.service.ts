import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { map, Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _posts!: Observable<Post[]>;
  private _currentPost: Post | undefined;
  private _edit = false;
  private _errors: { msg: string }[] = [];
  private _success = false;
  showErrorDlg = false;

  constructor(private http: HttpClient) {
    this.fetchPosts();
    this._posts.subscribe((posts) => (this._currentPost = posts[0]));
  }

  fetchPosts() {
    this._posts = this.http
      .get<{ success: boolean; posts: Post[]; errors: [] }>(
        'https://radiant-crag-39178.herokuapp.com/posts'
      )
      .pipe(map((res) => res.posts));
  }

  get posts(): Observable<Post[]> {
    return this._posts;
  }

  set currentPost(post: Post | undefined) {
    this._currentPost = post;
  }

  get currentPost(): Post | undefined {
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

  deleteResponse() {
    this._success = false;
    this._errors = [];
  }

  private handleErrorCallBack(err: any) {
    const message =
      err.error && typeof err.error === 'string' ? err.error : err.message;
    this._errors = [{ msg: message }];
    this.showErrorDlg = true;
    console.error(message);
  }

  toggleLike(post: Post, user: User) {
    this.http
      .put<{ success: boolean; posts: Post[]; errors: [{ msg: string }] }>(
        `https://radiant-crag-39178.herokuapp.com/posts/${post._id}/likes`,
        { user: user._id }
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            const index = post.likes.indexOf(user._id);
            index === -1
              ? post.likes.push(user._id)
              : post.likes.splice(index, 1);
          } else {
            this._errors = res.errors;
            throw new Error(res.errors[0].msg);
          }
        },
        error: (err) => this.handleErrorCallBack(err),
      });
  }

  togglePublish(post: Post, token: string) {
    this.http
      .put<{ success: boolean; post: Post; errors: [{ msg: string }] }>(
        `https://radiant-crag-39178.herokuapp.com/posts/${post._id}`,
        {
          ...post,
          published: !post.published,
        },
        { headers: { ['Authorization']: token } }
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            post.published = !post.published;
          } else {
            this._errors = res.errors;
            throw new Error(res.errors[0].msg);
          }
        },
        error: (err) => this.handleErrorCallBack(err),
      });
  }

  deletePost(token: string) {
    return this.http.delete<{
      success: boolean;
      post: Post;
      errors: { msg: string }[];
    }>(
      `https://radiant-crag-39178.herokuapp.com/posts/${
        (this._currentPost as any as Post)._id
      }`,
      { headers: { ['Authorization']: token } }
    );
  }

  postPost(post: any, token: string) {
    this.deleteResponse();
    return this.http.post<{
      success: boolean;
      post: Post;
      errors: { msg: string }[];
    }>('https://radiant-crag-39178.herokuapp.com/posts', post, {
      headers: { ['Authorization']: token },
    });
  }

  updatePost(post: any, token: string) {
    this.deleteResponse();
    return this.http.put<{
      success: boolean;
      post: Post;
      errors: { msg: string }[];
    }>(`https://radiant-crag-39178.herokuapp.com/posts/${post._id}`, post, {
      headers: { ['Authorization']: token },
    });
  }

  addPost(post: Post) {
    this._posts.subscribe((posts) => {
      const newPosts = posts;
      newPosts.push(post);
      this._posts = of(newPosts);
    });
  }

  removePost(post: Post) {
    this._posts.subscribe((posts) => {
      const newPosts = posts;
      const index = newPosts.findIndex((element) => element._id === post._id);
      newPosts.splice(index, 1);
      this._posts = of(newPosts);
    });
  }

  closeErrorDlg(): void {
    this.showErrorDlg = false;
  }
}
