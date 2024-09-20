import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { activatePost } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'signup',
    component: SignupComponent,
    canDeactivate: [(comp: SignupComponent) => comp.canDeactivate()],
  },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostsComponent, canActivate: [activatePost] },
  { path: '**', component: NotFoundComponent },
];
