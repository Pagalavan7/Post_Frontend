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
import { LoggedInUserData } from '../Models/user.model';

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
  totalPosts: number = 0;
  myPostFilter = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private postService: PostsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authService.$loggedInUser.subscribe({
      next: (userLoggedInData: LoggedInUserData | null) => {
        console.log(userLoggedInData);
        this.loggedUserName = userLoggedInData?.loggedInUserName;
      },
    });
    console.log('posts component called..');
  }

  ngOnInit() {
    const data = this.route.snapshot.url.map((x) => x.path);
    if (data[0].includes('my-posts')) {
      this.myPostFilter = true;
    }
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = [];
        if (!this.myPostFilter) {
          data.forEach((post) => {
            this.posts.push(post);
          });
          this.postService.updatePostCount(this.posts.length);
          console.log(this.posts, 'is the total posts ');
        } else {
          data
            .filter((x) => x.userName == this.loggedUserName)
            .forEach((x) => this.posts.push(x));
          console.log('hi im pagal', this.posts.length);
          this.postService.updatePostCount(this.posts.length);
          console.log(this.posts, 'is the total posts ');
        }
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
