import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostsService } from './services/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './components/posts/posts.component';
import { CardComponent } from './components/card/card.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { BlockComponent } from './components/block/block.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    PostComponent,
    LoginComponent,
    SignupComponent,
    PostsComponent,
    CardComponent,
    BlockComponent,
    ErrorMsgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighlightJsModule,
    FormsModule,
  ],
  providers: [PostsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
