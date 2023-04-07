import { Component, Input } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent {
  @Input() show!: boolean;
  @Input() card!: Card;
}
