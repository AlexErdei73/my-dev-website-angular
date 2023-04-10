import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { Variant } from '../card/card';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
})
export class PostsComponent implements OnInit {
  @Input() posts!: Post[];
  @Input() edit!: boolean;
  @Input() admin = false;
  @Input() showModal = false;
  danger = Variant.danger;
  user!: User;
  constructor(
    public postsService: PostsService,
    private router: Router,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.state.user;
  }

  getPostCard(post: Post) {
    return {
      variant: Variant.normal,
      headerTextLeft: `By ${(post.author as User).username}`,
      headerTextRight: `Likes: ${post.likes.length}`,
      footerTextLeft: `Created:${
        post.createdAt && post.createdAt.slice(0, 10)
      }`,
      footerTextRight: `Updated:${
        post.updatedAt && post.updatedAt.slice(0, 10)
      }`,
    };
  }

  onClickView(post: Post) {
    this.postsService.currentPost = post;
    this.router.navigateByUrl('/post');
  }

  isPostLiked(post: Post) {
    return this.user ? post.likes.indexOf(this.user._id) !== -1 : false;
  }

  onClickLike(post: Post) {
    this.postsService.toggleLike(post, this.user);
  }

  onClickDelete(post: Post) {
    this.showModal = true;
    this.postsService.currentPost = post;
  }

  onClickPublish(post: Post) {
    this.postsService.togglePublish(post, this.loginService.state.token);
  }

  onClickModalDelete() {
    this.postsService.deletePost(this.loginService.state.token).subscribe({
      next: (res) => {
        if (res.success) {
          this.postsService.removePost(res.post);
          this.postsService.posts.subscribe((posts) => {
            this.postsService.success = true;
            this.posts = posts;
            this.onClickModalCancel();
          });
        } else {
          this.postsService.errors = res.errors;
          throw new Error(res.errors[0].msg);
        }
      },
      error: (err) => {
        const message = err.error ? err.error : err.message;
        this.postsService.errors = [{ msg: message }];
        console.error(message);
      },
    });
  }

  onClickModalCancel() {
    this.showModal = false;
  }
}
