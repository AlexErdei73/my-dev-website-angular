import { Component, Input } from '@angular/core';
import { Block } from 'src/app/model/block';
import { Link } from 'src/app/model/link';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
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
    private loginService: LoginService,
    private errorHandlingService: ErrorHandlingService
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
          this.errors = this.errorHandlingService.handleErrors(err);
          //We show error messages in the edit-block component
          this.setEditing(true);
        },
      });
  }

  save(block: Block) {
    this.postsService
      .saveBlock(block, this.loginService.state.token)
      .subscribe({
        next: (res) => {
          this.postsService.currentPost!.content.push(res.block);
          this.errors = [];
          this.onCancel(block);
        },
        error: (err) => {
          this.errors = this.errorHandlingService.handleErrors(err);
          this.block = block;
        },
      });
  }

  update(block: Block) {
    this.postsService
      .updateBlock(block, this.loginService.state.token)
      .subscribe({
        next: () => {
          const index = this.postsService.currentPost!.content.findIndex(
            (block) => block._id === this.block._id
          );
          this.postsService.currentPost!.content.splice(index, 1, block);
          this.errors = [];
          this.onCancel(block);
        },
        error: (err): void => {
          this.errors = this.errorHandlingService.handleErrors(err);
          this.block = block;
        },
      });
  }

  onSubmitBlock(block: Block) {
    if (block._id === '') this.save(block);
    else this.update(block);
  }

  onCancel(_block: Block) {
    if (this.errors.length === 0) this.setEditing(false);
  }
}
