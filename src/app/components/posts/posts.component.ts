import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { PostsService } from 'src/app/services/posts.service';
import { Variant } from '../card/card';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
})
export class PostsComponent implements OnInit {
  @Input() posts!: Post[];
  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {}

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

  onCickView(post: Post) {
    this.postsService.currentPost = post;
    this.router.navigateByUrl('/post');
  }
}
