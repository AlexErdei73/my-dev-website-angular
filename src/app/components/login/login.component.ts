import { Component, OnInit } from '@angular/core';
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
  userPosts: Post[] = [];
  loginState!: Login;
  login = {
    name: '',
    password: '',
  };
  showNewPostForm = false;
  constructor(
    private loginService: LoginService,
    private postsService: PostsService
  ) {}
  ngOnInit(): void {
    this.loginState = this.loginService.state;
    this.login.name = this.loginState.user.username;
    this.login.password = this.loginState.password;
    this.postsService.posts.subscribe((posts) => {
      this.posts = posts;
      this.userPosts = this.getUserPosts();
    });
  }

  private setLoginMsg(msg: string) {
    this.loginState.msg = msg;
  }

  setLoginState = (loginState: Login) => {
    this.loginState = loginState;
    this.userPosts = this.getUserPosts();
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

  private getUserPosts() {
    return this.posts.filter(
      (post) => (post.author as User)._id === this.loginState.user._id
    );
  }

  onDeletePost(post: Post) {
    const index = this.posts.findIndex((element) => post._id === element._id);
    this.posts.splice(index, 1);
    this.userPosts = this.getUserPosts();
  }

  onClickNewPost() {
    this.showNewPostForm = true;
  }

  onCreatePost(post: Post) {
    post.author = this.loginService.state.user;
    this.posts.push(post);
    this.userPosts = this.getUserPosts();
    this.showNewPostForm = false;
  }

  onLogout() {
    this.loginService.logout();
    this.login.password = '';
    this.login.name = '';
    this.postsService.edit = false;
  }
}
