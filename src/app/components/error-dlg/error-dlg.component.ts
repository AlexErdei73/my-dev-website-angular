import { Component, Input } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Variant } from '../card/card';

@Component({
  selector: 'app-error-dlg',
  templateUrl: './error-dlg.component.html',
  styleUrls: ['./error-dlg.component.less'],
})
export class ErrorDlgComponent {
  @Input() error!: { msg: string };
  @Input() show!: boolean;
  danger = Variant.danger;
  constructor(private postsService: PostsService) {}

  close() {
    this.postsService.closeErrorDlg();
  }
}
