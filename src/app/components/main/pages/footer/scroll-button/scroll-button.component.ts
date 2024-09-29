import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  imports: [],
  templateUrl: './scroll-button.component.html',
})
export class ScrollButtonComponent {
  public showButton: boolean = false;
  private readonly SCROLL_THRESHOLD = 0.5; // 50% de la altura de la página

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    // Mostrar el botón cuando se ha scrolleado más allá del umbral
    this.showButton = scrollPosition > windowHeight * this.SCROLL_THRESHOLD;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
