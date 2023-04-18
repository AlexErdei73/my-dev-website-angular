import { Component, OnInit, Input } from '@angular/core';
import { Block } from 'src/app/model/block';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Input() edit!: boolean;
  newBlock!: Block;
  constructor(public postsService: PostsService) {}
  ngOnInit(): void {
    this.newBlock = {
      _id: '',
      post: this.postsService.currentPost._id,
      type: 'paragraph',
      text: 'New Block',
      language: ' ',
      links: [],
    };
  }
}
