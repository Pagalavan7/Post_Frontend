import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  @ViewChild('navbar') navbar: ElementRef | undefined;

  navbarCollapse() {
    console.log(this.navbar);
    if (this.navbar) {
      const navbarCollapse = this.navbar.nativeElement;
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  }
}
