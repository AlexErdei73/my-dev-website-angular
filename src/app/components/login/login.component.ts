import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Login } from 'src/app/model/login';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

interface LoginForm {
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  login: LoginForm = {
    name: this._loginState.state.user.username,
    password: this._loginState.state.password,
  };
  posts: Post[] = [];
  @Output() private logout = new EventEmitter<Login>();
  constructor(
    public _loginState: LoginService,
    public postsService: PostsService
  ) {}
  ngOnInit(): void {
    this.postsService.posts.subscribe((posts) => (this.posts = posts));
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

  onLogout() {
    this._loginState.logout();
    this.login.password = '';
    this.login.name = '';
  }
}
