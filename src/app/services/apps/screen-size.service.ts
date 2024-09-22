import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private isMobileSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isMobile$: Observable<boolean> = this.isMobileSubject.asObservable();

  constructor() {
    this.checkScreenSize();
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.checkScreenSize());
  }

  private checkScreenSize(): void {
    const isMobile = window.innerWidth < 900;
    this.isMobileSubject.next(isMobile);
  }
}