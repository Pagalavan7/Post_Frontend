import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  showProfile = false;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  @ViewChild('navbar') navbar: ElementRef | undefined;
  isUserSignedIn: boolean = false;
  ngOnInit() {
    this.authService.userSignedIn$.subscribe((x) => {
      this.isUserSignedIn = x;
    });
  }

  onLogout() {
    const res = confirm('You really want to logout?');
    if (res) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  onProfile() {
    this.showProfile = !this.showProfile;
  }

  showMyPosts() {
    this.showProfile = !this.showProfile;
  }

  navbarCollapse() {
    if (this.navbar) {
      const navbarCollapse = this.navbar.nativeElement;
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  }
}
