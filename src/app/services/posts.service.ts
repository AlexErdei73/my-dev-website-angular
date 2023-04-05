import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _posts!: Observable<Post[]>;
  private _currentPost: Post | undefined;

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
}
