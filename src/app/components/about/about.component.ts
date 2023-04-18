import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
})
export class AboutComponent implements OnInit {
  aboutPost!: Post;
  constructor(private postService: PostsService, private router: Router) {}
  ngOnInit(): void {
    this.aboutPost = this.postService.aboutPost;
  }
}
