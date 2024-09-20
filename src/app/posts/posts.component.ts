import { Component, inject } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  userService = inject(UserService);

  ngOnInit() {
    this.userService.getAllPosts().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
