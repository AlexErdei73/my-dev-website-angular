import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
})
export class AboutComponent implements OnInit {
  posts!: Post[];
  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.postService.posts.subscribe((posts) => (this.posts = posts));
  }

  aboutPost() {
    const ABOUT_POST = '6404bca2160e826767e36aa3';
    return this.posts.find((post) => post._id === ABOUT_POST);
  }
}
