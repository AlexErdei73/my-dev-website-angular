import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
})
export class PostsComponent {
  constructor(private postsService: PostsService) {
    postsService.fetchPosts();
    console.log(postsService.posts);
  }
}
