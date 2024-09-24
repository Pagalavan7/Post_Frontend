import {
  ChangeDetectorRef,
  EventEmitter,
  inject,
  Injectable,
} from '@angular/core';
import { Post } from '../Models/post.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  // sendPost$ = new Subject<Post>();

  authService: AuthService = inject(AuthService);
  http: HttpClient = inject(HttpClient);
  private postsSubject = new BehaviorSubject<Post[]>([]); // Start with an empty array
  sendPost$ = this.postsSubject.asObservable();

  // event: EventEmitter<Post> = new EventEmitter<Post>();

  postsAPI = 'http://localhost:3000/api/posts/';

  createPost(postData: Post) {
    console.log(postData);
    this.postsSubject.next([postData]);
  }

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
