import { Component, Input } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.less'],
})
export class PostTitleComponent {
  @Input() post!: Post;
  edit = this.postsService.edit;
  editing = false;
  errors: { msg: string }[] = [];
  constructor(private postsService: PostsService) {}

  changeTitle(titleForm: { valid: any }) {
    if (titleForm.valid) {
      this.errors = [];
      this.editing = false;
      window.alert(this.post.title);
    } else {
      this.errors.push({ msg: 'Title is required!' });
    }
  }

  onClickEditing() {
    this.editing = true;
  }

  onClickCancel() {
    this.editing = false;
  }
}
