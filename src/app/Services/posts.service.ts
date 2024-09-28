import {
  ChangeDetectorRef,
  EventEmitter,
  inject,
  Injectable,
  Output,
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

  posts: Post[] = [];

  authService: AuthService = inject(AuthService);
  http: HttpClient = inject(HttpClient);
  // private postsSubject = new BehaviorSubject<Post[]>([]); // Start with an empty array
  // sendPost$ = this.postsSubject.asObservable();

  // @Output() event: EventEmitter<Post> = new EventEmitter<Post>();

  postsAPI = 'http://localhost:3000/api/posts/';

  // createPost(postData: Post) {
  //   this.posts.push(postData);
  //   console.log(
  //     'in post service. sending the below data to post comp..,',
  //     this.posts
  //   );
  //   this.event.emit(postData);
  // }

  getAllPosts() {
    return this.http.get<Post[]>(`${this.postsAPI}get-all-posts`);
  }
  getPostById(postId: number) {
    return this.http.get<Post>(`${this.postsAPI}get-post/${postId}`);
  }

  editPost(patchData: Post) {
    console.log('edit post service called..');
    console.log('Patch data', patchData);
    return this.http.patch(
      `${this.postsAPI}edit-post/${patchData.id!}`,
      patchData
    );
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
