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
  empty_post: Post = {
    _id: '',
    title: '...Loading',
    author: '',
    content: [],
    comments: [],
    likes: [],
    published: false,
    createdAt: '',
    updatedAt: '',
  };
  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.posts = [this.empty_post];
    this.postService.posts.subscribe((posts) => (this.posts = posts));
  }

  aboutPost() {
    const ABOUT_POST = '64347b31a310964c06459b3b';
    return this.posts.find((post) => post._id === ABOUT_POST);
  }
}
