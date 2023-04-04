import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.less'],
})
export class ErrorMsgComponent {
  @Input() msg!: string;
}
