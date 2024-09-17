import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  imports: [],
  templateUrl: './scroll-button.component.html',
})
export class ScrollButtonComponent {

public showButton: boolean = false;

@HostListener('window:scroll', [])
onWindowScroll() {
  const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  const windowBottom = windowHeight + window.pageYOffset;

  if (windowBottom >= docHeight) {
    this.showButton = true;  // Mostrar el botón cuando se llega al final
  } else {
    this.showButton = false; // Ocultar el botón si no se ha llegado al final
  }
}
}
