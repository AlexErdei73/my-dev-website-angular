import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { map, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _posts!: Observable<Post[]>;
  private _currentPost: Post | undefined;
  private _errors: { msg: string }[] = [];
  private _success = false;

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

  get success() {
    return this._success;
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
            throw new Error(res.errors[0].msg);
          }
        },
        error: (err: { message: string }) => {
          throw new Error(err.message);
        },
      });
  }

  deletePost(token: string) {
    this._success = false;
    this._errors = [];
    this.http
      .delete<{ success: boolean; posts: Post[]; errors: [{ msg: string }] }>(
        `https://radiant-crag-39178.herokuapp.com/posts/${
          this._currentPost!._id
        }`,
        { headers: { ['Authorization']: token } }
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this._success = true;
            this.fetchPosts();
          } else {
            this._errors = res.errors;
            throw new Error(res.errors[0].msg);
          }
        },
        error: (err: { message: string }) => {
          this._errors = [{ msg: err.message }];
          throw new Error(err.message);
        },
      });
  }
}
