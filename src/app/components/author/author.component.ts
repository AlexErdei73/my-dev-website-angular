import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.less'],
})
export class AuthorComponent implements OnInit {
  author!: User;
  username = this.loginService.state.user.username;
  constructor(
    private postsService: PostsService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.author = this.postsService.currentPost!.author as User;
  }
}
