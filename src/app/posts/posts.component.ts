import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { PostsService } from '../Services/posts.service';
import { Post } from '../Models/post.model';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  posts: Post[] = [];
  loggedUserName: string | undefined;
  constructor(
    private cdr: ChangeDetectorRef,
    private postService: PostsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loggedUserName = this.authService.loggedUserName;
  }

  ngOnInit() {
    console.log('ngOninit called');
    this.getAllPosts();
  }

  getAllPosts() {
    console.log('im called');
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        console.log('data from backend', data);
        this.posts = [];
        data.forEach((post) => {
          this.posts.push(post);
        });
        console.log(this.posts, 'is the value of posts');
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => this.cdr.detectChanges(),
    });
  }
  ngAfterViewInit() {
    console.log('ng after view init called');
    console.log(this.posts.length);
  }
  ngDoCheck() {
    console.log('ng do check called');
    console.log(this.posts.length);
  }

  onDeletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => this.getAllPosts(),
    });
  }

  deleteAllPosts() {
    console.log('delete all Posts called');
    this.posts = [];
    this.postService.deleteAllPosts().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.log('delete all posts complete'),
    });
  }
}
