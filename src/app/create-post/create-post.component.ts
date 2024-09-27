import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostsService } from '../Services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../Models/post.model';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  @ViewChild('postForm') postForm!: NgForm;
  constructor(private postService: PostsService, private router: Router) {}

  onSubmit() {
    const now = new Date();

    // Extract day, month, and year
    const day = String(now.getDate()).padStart(2, '0'); // Pad single digits with leading zero
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = now.getFullYear();

    // Format the date as DD/MM/YYYY
    const createdOn = `${day}/${month}/${year}`;
    let postData: Post = this.postForm.value;
    postData = { ...postData, createdOn: createdOn };

    this.post(postData);
    this.router.navigate(['/posts']);
  }

  post(data: Post) {
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
}
