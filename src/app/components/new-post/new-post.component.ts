import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { Post } from 'src/app/model/post';

interface NewPost {
  title: string;
  author: string;
  msg: string;
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.less'],
})
export class NewPostComponent implements OnInit {
  newPost!: NewPost;
  @Output() private createPost: EventEmitter<Post> = new EventEmitter<Post>();

  constructor(
    private loginService: LoginService,
    private postsService: PostsService,
    private errorHandlingService: ErrorHandlingService
  ) {}
  ngOnInit() {
    this.newPost = {
      title: '',
      author: this.loginService.state.user._id,
      msg: '',
    };
  }

  onSubmit(newPostForm: { valid: any }) {
    if (newPostForm.valid) {
      this.newPost.msg = '';
      this.postsService
        .postPost(this.newPost, this.loginService.state.token)
        .subscribe({
          next: (res) => {
            this.postsService.addPost(res.post);
            this.postsService.success = true;
            this.createPost.emit(res.post);
          },
          error: (err) => {
            this.postsService.errors =
              this.errorHandlingService.handleErrors(err);
            this.newPost.msg = this.postsService.errors[0].msg;
            console.error(this.newPost.msg);
          },
        });
    } else {
      this.newPost.msg = 'Title is required!';
    }
  }
}
