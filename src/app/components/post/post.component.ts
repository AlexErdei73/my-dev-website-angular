import { Component, OnInit, Input } from '@angular/core';
import { Block } from 'src/app/model/block';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Input() edit!: boolean;
  newBlock!: Block;
  author!: User;
  constructor() {}
  ngOnInit(): void {
    this.newBlock = {
      _id: '',
      post: this.post._id,
      type: 'paragraph',
      text: 'New Block',
      language: ' ',
      links: [],
    };
    this.author = this.post.author as User;
  }
}
