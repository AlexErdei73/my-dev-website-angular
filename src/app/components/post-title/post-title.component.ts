import { Component, Input } from '@angular/core';
import { Post } from 'src/app/model/post';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.less'],
})
export class PostTitleComponent {
  @Input() post!: Post;
  @Input() edit = this.postsService.edit;
  editing = false;
  errors: { msg: string }[] = [];
  constructor(
    private postsService: PostsService,
    private loginService: LoginService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  changeTitle(titleForm: { valid: any }) {
    if (titleForm.valid) {
      this.postsService
        .updatePost(this.post, this.loginService.state.token)
        .subscribe({
          next: (res) => {
            this.postsService.posts.subscribe((posts) => {
              const index = posts.findIndex(
                (post) => post._id === this.post._id
              );
              posts[index] = this.post;
            });
            this.postsService.errors = [];
            this.errors = [];
            this.editing = false;
          },
          error: (err) => {
            this.errors = this.errorHandlingService.handleErrors(err);
            this.postsService.errors = this.errors;
            console.error(this.errors[0].msg);
          },
        });
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
