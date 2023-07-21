import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/model/user';
import { AuthorComponent } from './author.component';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let author: User;

  author = {
    _id: '63ab6c333bbf8653df7e1175',
    username: 'test username',
    password: '',
    hash: '',
    isAdmin: false,
    jobTitle: 'test job',
    bio: 'test bio',
    name: 'test name',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      //imports: [HttpClientModule],
      //providers: [LoginComponent, PostsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    component.author = author;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
