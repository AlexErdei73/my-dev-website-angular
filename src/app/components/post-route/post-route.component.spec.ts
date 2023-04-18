import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRouteComponent } from './post-route.component';

describe('PostRouteComponent', () => {
  let component: PostRouteComponent;
  let fixture: ComponentFixture<PostRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
