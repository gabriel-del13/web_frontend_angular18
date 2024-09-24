import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DarkModeToggleComponent } from '../header/dark-mode-toggle/dark-mode-toggle.component';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, DarkModeToggleComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuHidden = true;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }
}