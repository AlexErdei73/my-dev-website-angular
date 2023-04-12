import { Component, Input } from '@angular/core';
import { Block } from 'src/app/model/block';
import { Link } from 'src/app/model/link';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.less'],
})
export class BlockComponent {
  @Input() block!: Block;
  @Input() edit!: boolean;
  showEditing = false;
  errors: { msg: string }[] = [];
  constructor(
    private postsService: PostsService,
    private loginService: LoginService
  ) {}

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

  setEditing(editing: boolean) {
    this.showEditing = editing;
  }

  remove(block: Block) {
    this.postsService
      .deleteBlock(block, this.loginService.state.token)
      .subscribe({
        next: () => {
          const index = this.postsService.currentPost!.content.findIndex(
            (block) => block._id === this.block._id
          );
          this.postsService.currentPost!.content.splice(index, 1);
        },
        error: (err) => {
          this.errors = [{ msg: err.message }];
          if (err.error.errors) this.errors = err.error.errors;
          if (typeof err.error === 'string') this.errors = [{ msg: err.error }];
          this.showEditing = true;
        },
      });
  }

  onSubmitBlock(block: Block) {
    console.log('Block is submitted! ', block);
    if (this.errors.length === 0) this.setEditing(false);
  }

  onCancel(block: Block) {
    console.log('Editing is canceled!', block);
    this.setEditing(false);
  }
}
