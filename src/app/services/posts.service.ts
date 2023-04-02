import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _posts!: Observable<Post[]>;

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  fetchPosts() {
    this._posts = this.http
      .get<{ success: boolean; posts: Post[]; errors: [] }>(
        'https://radiant-crag-39178.herokuapp.com/posts'
      )
      .pipe(map((res) => res.posts));
  }

  get posts(): any {
    return this._posts;
  }
}
