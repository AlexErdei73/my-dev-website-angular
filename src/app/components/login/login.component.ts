import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Login } from 'src/app/model/login';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  posts: Post[] = [];
  loginState!: Login;
  login = {
    name: '',
    password: '',
  };
  constructor(
    private loginService: LoginService,
    private postsService: PostsService
  ) {}
  ngOnInit(): void {
    this.loginState = this.loginService.state;
    this.login.name = this.loginState.user.username;
    this.login.password = this.loginState.password;
    this.postsService.posts.subscribe((posts) => (this.posts = posts));
  }

  private setLoginMsg(msg: string) {
    this.loginState.msg = msg;
  }

  setLoginState = (loginState: Login) => {
    this.loginState = loginState;
  };

  onSubmit(loginForm: { valid: any }) {
    let msg;
    if (!loginForm.valid) {
      msg = 'Please fill in all fields!';
      this.setLoginMsg(msg);
    }
    if (loginForm.valid) {
      this.setLoginMsg('');
      this.loginService.state.user.username = this.login.name;
      this.loginService.state.password = this.login.password;
      this.loginService.login(this.setLoginState);
    }
  }

  userPosts() {
    return this.posts.filter(
      (post) => (post.author as User)._id === this.loginState.user._id
    );
  }

  onLogout() {
    this.loginService.logout();
    this.login.password = '';
    this.login.name = '';
  }
}
