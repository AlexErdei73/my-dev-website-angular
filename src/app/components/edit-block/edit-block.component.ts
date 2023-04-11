import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Block } from 'src/app/model/block';
import { Link } from 'src/app/model/link';

@Component({
  selector: 'app-edit-block',
  templateUrl: './edit-block.component.html',
  styleUrls: ['./edit-block.component.less'],
})
export class EditBlockComponent implements OnInit {
  @Input() block!: Block;
  @Input() errors: { msg: string }[] = [];
  @Output() private submitBlock = new EventEmitter<Block>();
  @Output() private cancel = new EventEmitter<Block>();
  newBlock!: Block;
  constructor() {}
  ngOnInit(): void {
    this.newBlock = this.addLinksToBlockText(this.block);
  }

  onSubmit(newBlockForm: { valid: any }) {
    if (newBlockForm.valid) {
      const { text, links } = this.separateLinksFromText(this.newBlock.text);
      this.newBlock.text = text;
      this.newBlock.links = links;
      this.submitBlock.emit(this.newBlock);
    } else {
      this.errors.push({ msg: 'Text is required!' });
    }
  }

  onCancel() {
    this.newBlock = this.block;
    this.cancel.emit(this.block);
  }

  numberOfLines(text: string) {
    return text.split('\n').length;
  }

  textWithLinks(block: Block) {
    if (!block.links) return block.text;
    const text = [];
    let previousPosition = 0;
    block.links.forEach((link) => {
      const nextTextPiece = block.text.slice(previousPosition, link.position);
      if (nextTextPiece) text.push(nextTextPiece);
      text.push(`[${link.description}](${link.url})`);
      previousPosition = link.position;
    });
    const nextTextPiece = block.text.slice(previousPosition, block.text.length);
    if (nextTextPiece) text.push(nextTextPiece);
    return text.join('');
  }

  addLinksToBlockText(block: Block) {
    if (block.type === 'paragraph') {
      const copyBlock = JSON.parse(JSON.stringify(block));
      copyBlock.text = this.textWithLinks(block);
      copyBlock.links = [];
      return copyBlock;
    } else return block;
  }

  separateLinksFromText(textInput: string) {
    const textPieces = textInput.split('](');
    const links: Link[] = [];
    let position = 0;
    textPieces.forEach((piece, index) => {
      const previousPiece = textPieces[index - 1];
      if (previousPiece && previousPiece.indexOf('[') !== -1) {
        const pieces = previousPiece.split('[');
        textPieces[index - 1] = pieces[0];
        position += pieces[0].length;
        links.push({ url: '', description: pieces[1], position: 0 });
      }
      if (piece.indexOf(')') !== -1) {
        const pieces = piece.split(')');
        const link = links.pop();
        if (link) {
          link.url = pieces[0];
          link.position = position;
          links.push(link);
          textPieces[index] = pieces[1];
        }
      }
    });
    return { links: links, text: textPieces.join('') };
  }
}
