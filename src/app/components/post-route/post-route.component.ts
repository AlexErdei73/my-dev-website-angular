import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-route',
  templateUrl: './post-route.component.html',
  styleUrls: ['./post-route.component.less'],
})
export class PostRouteComponent implements OnInit {
  currentPost!: Post;
  edit!: boolean;
  constructor(private postsService: PostsService) {}
  ngOnInit(): void {
    this.currentPost = this.postsService.currentPost;
    this.edit = this.postsService.edit;
  }
}
