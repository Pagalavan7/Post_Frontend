import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  authService: AuthService = inject(AuthService);

  @ViewChild('navbar') navbar: ElementRef | undefined;
  isUserSignedIn: boolean = false;
  ngOnInit() {
    this.authService.userSignedIn$.subscribe((x) => {
      this.isUserSignedIn = x;
      console.log(
        'whether user signed in inside navbar: ',
        this.isUserSignedIn
      );
    });
  }

  onLogout() {
    const res = confirm('You really want to logout?');
    if (res) this.authService.logout();
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
