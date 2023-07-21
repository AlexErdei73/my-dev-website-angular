import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.less'],
})
export class AuthorComponent implements OnInit {
  @Input() author!: User;
  username!: string;
  ngOnInit(): void {
    this.author = this.author as User;
    this.username = this.author.username;
  }
}
