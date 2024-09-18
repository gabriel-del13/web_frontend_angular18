import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrousel.component.html',
})
export class carrouselComponent implements OnInit{
  images: { src: string, bgColor: string }[]= [
    { src: 'Image-1-movil.png', bgColor: 'bg-[#6b88fe]' },
    { src: 'Image-2-movil.png', bgColor: 'bg-[#030204]' },
    { src: 'Image-3-movil.png', bgColor: 'bg-[#80efb8]' },
    { src: 'Image-4-movil.png', bgColor: 'bg-[#1c246d]' },
  ];
  
  currentIndex: number = 0;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.preloadImages();
  }

  preloadImages(): void {
    let loadedImages = 0;
    this.images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === this.images.length) {
          this.isLoading = false;
        }
      };
      img.onerror = () => {
        loadedImages++;
        if (loadedImages === this.images.length) {
          this.isLoading = false;
        }
      };
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}