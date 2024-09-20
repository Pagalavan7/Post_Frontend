import { inject } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';

export const activatePost = () => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    console.log('user is authenticated.. routing to posts');
    return true;
  } else {
    return false;
  }
};

export const resolvePost = () => {
  const userService = inject(UserService);
  return userService.getAllPosts();
};
