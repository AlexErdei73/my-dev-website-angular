import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _posts: Post[] = [];
  private errors: { msg: string }[] = [];
  private success = false;

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http
      .get<{ success: boolean; posts: Post[]; errors: [] }>('/posts')
      .subscribe({
        next: (response) => {
          this._posts = response.posts;
          this.success = response.success;
          this.errors = response.errors;
        },
        error: (err) => (this.errors = [{ msg: err.message }]),
      });
  }

  get posts(): any {
    return this._posts;
  }
}
