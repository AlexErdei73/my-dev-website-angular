import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';
import { CardComponent } from '../card/card.component';
import { ErrorDlgComponent } from '../error-dlg/error-dlg.component';
import { ModalComponent } from '../modal/modal.component';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostsComponent,
        CardComponent,
        ModalComponent,
        ErrorDlgComponent,
      ],
      imports: [HttpClientModule],
      providers: [PostsService, LoginService, Router],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    component.posts = [];
    component.edit = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
