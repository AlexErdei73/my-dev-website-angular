import { Component, Input, OnInit } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
})
export class CardComponent implements OnInit {
  classNameHeader!: string;
  classNameFooter!: string;
  @Input() public card!: Card;
  constructor() {}
  ngOnInit(): void {
    this.classNameHeader = this.card.variant;
    this.classNameFooter = `footer-${this.card.variant}`;
  }
}
