import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

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
            if (res.success) {
              this.postsService.addPost(res.post);
              this.postsService.posts.subscribe((res) => {
                this.postsService.success = true;
                this.router.navigate(['/login']);
              });
            } else {
              this.postsService.errors = res.errors;
              throw new Error(res.errors[0].msg);
            }
          },
          error: (err) => {
            const message = err.error ? err.error : err.message;
            this.postsService.errors = [{ msg: message }];
            this.newPost.msg = message;
            console.error(message);
          },
        });
    } else {
      this.newPost.msg = 'Title is required!';
    }
  }
}
