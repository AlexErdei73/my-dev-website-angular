import { Component, Input } from '@angular/core';
import { Block } from 'src/app/model/block';
import { Link } from 'src/app/model/link';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.less'],
})
export class BlockComponent {
  @Input() block!: Block;

  private addLinks(text: string, links: Link[]) {
    let shift = 0; //Shift the position from the original with the combined lengths of the insertations
    links
      .map((link) => {
        return {
          text: `<a href="${link.url}">${link.description}</a>`,
          pos: link.position,
        };
      })
      .filter((link) => link.pos >= 0) //Filter out links with incorrect position to avoid unwanted behaviour
      .sort((link1, link2) => link1.pos - link2.pos) //Sort links to increasing position to avoid unwanted behaviour
      .forEach((link) => {
        //Insert links in text
        const position = link.pos + shift;
        const firstTextPart = text.slice(0, position) + ' ';
        const lastTextPart = ' ' + text.slice(position, text.length + 1);
        text = firstTextPart + link.text + lastTextPart;
        shift = shift + link.text.length + 2;
      });
    return text;
  }

  textWithLinks() {
    return this.addLinks(this.block.text, this.block.links);
  }
}
