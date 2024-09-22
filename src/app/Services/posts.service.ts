import { inject, Injectable } from '@angular/core';
import { Post } from '../Models/post.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  authService: AuthService = inject(AuthService);
  http: HttpClient = inject(HttpClient);

  postsAPI = 'http://localhost:3000/api/posts/';
  getAllPosts() {
    return this.http.get<Post[]>(`${this.postsAPI}get-all-posts`);
  }
  deleteAllPosts() {
    return this.http.delete(`${this.postsAPI}delete-all-posts`);
  }
  deletePost(id: number) {
    this.authService.logout();
    return this.http.delete(`${this.postsAPI}delete-post/${id}`);
  }
  post(data: any) {
    return this.http.post(`${this.postsAPI}save-post`, data);
  }
}
