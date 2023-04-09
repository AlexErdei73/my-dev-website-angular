import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { Variant } from '../card/card';

interface Login {
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  login: Login = {
    name: this._loginState.state.user.username,
    password: this._loginState.state.password,
  };
  posts: Post[] = [];
  danger!: Variant;
  showModal = false;
  constructor(
    public _loginState: LoginService,
    public postsService: PostsService
  ) {
    //We need to bind this to the instance if we want to send the function
    //to the posts component with the Input decorator
    //This is the very same problem, which happens with React class components
    //the solution is the exact same
    //we may be able to avoid this with event binding of Angular
    //so instead of passing the function we can emmit an event there and
    //catch it here an run the function here
    this.onClickShowModal = this.onClickShowModal.bind(this);
  }
  ngOnInit(): void {
    this.postsService.posts.subscribe((posts) => (this.posts = posts));
    this.danger = Variant.danger;
  }

  private setLoginMsg(msg: string) {
    this._loginState.state.msg = msg;
  }

  onSubmit(loginForm: { valid: any }) {
    let msg;
    if (!loginForm.valid) {
      msg = 'Please fill in all fields!';
      this.setLoginMsg(msg);
    }
    if (loginForm.valid) {
      this.setLoginMsg('');
      this._loginState.state.user.username = this.login.name;
      this._loginState.state.password = this.login.password;
      this._loginState.login();
    }
  }

  userPosts() {
    return this.posts.filter(
      (post) =>
        (post.author as any as User)._id === this._loginState.state.user._id
    );
  }

  logout() {
    this._loginState.logout();
    this.login.password = '';
    this.login.name = '';
  }

  onClickShowModal() {
    this.postsService.deleteResponse();
    this.showModal = true;
  }

  onClickDelete() {
    this.postsService.deletePost(this._loginState.state.token).subscribe({
      next: (res) => {
        if (res.success) {
          this.postsService.removePost(res.post);
          this.postsService.posts.subscribe((posts) => {
            this.postsService.success = true;
            this.posts = posts;
            this.onClickCancel();
          });
        } else {
          this.postsService.errors = res.errors;
          throw new Error(res.errors[0].msg);
        }
      },
      error: (err: { message: string }) => {
        this.postsService.errors = [{ msg: err.message }];
        console.error(err.message);
      },
    });
  }

  onClickCancel() {
    this.showModal = false;
  }
}
