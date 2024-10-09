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
  loggedInUserPosts: Post[] = [];
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
    console.log('posts component called..');
    this.authService.$loggedInUser.subscribe({
      next: (userLoggedInData: LoggedInUserData | null) => {
        console.log(userLoggedInData);
        this.loggedUserName = userLoggedInData?.loggedInUserName;
      },
    });
  }

  ngOnInit() {
    const data = this.route.snapshot.url.map((x) => x.path);

    if (data[0].includes('my-posts')) {
      console.log('my-posts included..');
      this.myPostFilter = true;
    }
    this.getAllPosts();
  }

  getAllPosts() {
    console.log('get ll posts called..');
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = [];
        data.forEach((post) => {
          this.posts.push(post);
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('get all posts complete');
        this.cdr.detectChanges();
        this.getMyPosts();
      },
    });
  }

  getMyPosts() {
    console.log('get my posts called..');
    this.loggedInUserPosts = this.posts.filter(
      (x) => x.userName == this.loggedUserName
    );
    console.log('my posts,..', this.loggedInUserPosts);
    this.postService.$postCount.next(this.loggedInUserPosts.length);
    if (this.myPostFilter) {
      console.log('inside mypostfilter if condition..');
      this.posts = this.loggedInUserPosts;

      console.log('my posts aree..', this.posts);
      this.cdr.detectChanges();
    }
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
