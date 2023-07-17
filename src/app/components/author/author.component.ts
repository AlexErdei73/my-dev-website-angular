import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.less'],
})
export class AuthorComponent implements OnInit {
  @Input() author!: User;
  username = this.loginService.state.user.username;
  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.author = this.author as User;
  }
}
