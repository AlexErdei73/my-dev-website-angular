import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private loginService: LoginService) {}
  ngOnInit() {
    this.newPost = {
      title: '',
      author: this.loginService.state.user._id,
      msg: '',
    };
  }

  onSubmit(newPostForm: any) {
    if (newPostForm.valid) {
      this.newPost.msg = '';
      console.log(this.newPost);
    } else {
      this.newPost.msg = 'Title is required!';
    }
  }
}
