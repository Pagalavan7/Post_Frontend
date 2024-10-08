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
  myPostFilter = false;
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
    this.getAllPosts();
    const data = this.route.snapshot.url.map((x) => x.path);
    if (data[0].includes('my-posts')) {
      console.log(data[0], 'came inside if block');
      this.myPostFilter = true;
    }
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = [];
        if (!this.myPostFilter) {
          data.forEach((post) => {
            this.posts.push(post);
          });
        } else {
          data
            .filter((x) => x.userName == this.loggedUserName)
            .forEach((x) => this.posts.push(x));
        }
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => this.cdr.detectChanges(),
    });
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

  onEditPost(postId: number) {
    this.router.navigate(['/edit-post', postId]);
  }
}
