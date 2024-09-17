import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DarkModeToggleComponent } from '../header/dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, DarkModeToggleComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isMenuHidden = true;

  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }
}