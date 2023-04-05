import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.postService.posts.subscribe((posts) => (this.posts = posts));
  }

  publishedPosts() {
    return this.posts.filter((post) => post.published);
  }
}
