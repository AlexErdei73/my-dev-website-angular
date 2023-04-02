import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Card, Variant } from '../card/card';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
})
export class PostsComponent implements OnInit {
  postCard: Card = {
    variant: Variant.normal,
    headerTextLeft: 'Hello!',
    headerTextRight: 'Post',
    footerTextLeft: 'Created',
    footerTextRight: 'Edited',
  };
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.fetchPosts();
    console.log(this.postsService.posts);
  }
}
