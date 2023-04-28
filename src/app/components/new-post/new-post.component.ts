import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

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

  constructor(
    private loginService: LoginService,
    private postsService: PostsService,
    private errorHandlingService: ErrorHandlingService,
    private router: Router
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
            this.postsService.posts.subscribe((res) => {
              this.postsService.success = true;
              this.router.navigate(['/login']);
            });
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
