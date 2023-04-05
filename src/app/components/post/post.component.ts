import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
})
export class PostComponent implements OnInit {
  @Input() post: Post | undefined;
  constructor(private postsService: PostsService) {}
  ngOnInit(): void {
    if (!this.post) this.post = this.postsService.currentPost;
  }
}
