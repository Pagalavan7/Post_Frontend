import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { PostsService } from '../Services/posts.service';
import { Post } from '../Models/post.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PostsComponent {
  posts: any[] = [];
  postService: PostsService = inject(PostsService);
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAllPosts();
    this.postService.sendPost$.subscribe({
      next: (postData: Post[]) => {
        console.log('data emitted from service..', postData);
        this.posts = [...this.posts, ...postData];
        console.log('inside post component.. posts array value', this.posts);
        this.cdr.detectChanges(); // Optional if you use async pipe
      },
    });
  }

  getAllPosts() {
    console.log('get Posts called');
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        data.forEach((post) => {
          this.posts = [...this.posts, post];
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.log('get all posts complete'),
    });
  }

  post(data: any) {
    this.postService.post(data).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.log('post data complete'),
    });
  }

  deletePost() {
    this.postService.deletePost(1).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.log('delete  post complete'),
    });
  }

  deleteAllPosts() {
    console.log('delete all Posts called');
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
