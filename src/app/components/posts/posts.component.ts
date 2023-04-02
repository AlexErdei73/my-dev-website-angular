import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { PostsService } from 'src/app/services/posts.service';
import { Card, Variant } from '../card/card';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.posts;
  }

  getPostCard(post: Post) {
    return {
      variant: Variant.normal,
      headerTextLeft: `By ${(post.author as User).username}`,
      headerTextRight: `Likes: ${post.likes.length}`,
      footerTextLeft: `Created:${
        post.createdAt && post.createdAt.slice(0, 10)
      }`,
      footerTextRight: `Updated:${
        post.updatedAt && post.updatedAt.slice(0, 10)
      }`,
    };
  }
}
