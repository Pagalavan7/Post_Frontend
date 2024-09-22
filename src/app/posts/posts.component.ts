import { Component, inject } from '@angular/core';
import { PostsService } from '../Services/posts.service';
import { Post } from '../Models/post.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  postService: PostsService = inject(PostsService);

  getAllPosts() {
    console.log('get Posts called');
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        data.forEach((post) => {
          console.log(post);
        });
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
