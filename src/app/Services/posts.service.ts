import { inject, Injectable } from '@angular/core';
import { Post } from '../Models/post.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  http: HttpClient = inject(HttpClient);

  postsAPI = 'http://localhost:3000/api/posts/';
  getAllPosts() {
    return this.http.get<Post[]>(`${this.postsAPI}get-all-posts`);
  }
  deleteAllPosts() {
    return this.http.delete(`${this.postsAPI}delete-all-posts`);
  }
  deletePost(id: number) {
    return this.http.delete(`${this.postsAPI}delete-post/${id}`);
  }
  post(data: any) {
    return this.http.post(`${this.postsAPI}save-post`, data);
  }
}
