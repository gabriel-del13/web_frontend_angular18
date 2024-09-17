import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private get isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  toggleDarkMode() {
    const newDarkModeState = !this.darkMode.value;
    this.darkMode.next(newDarkModeState);
    
    if (this.isLocalStorageAvailable) {
      localStorage.setItem('darkMode', newDarkModeState ? 'enabled' : 'disabled');
    }
    
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newDarkModeState);
    }
  }

  initializeDarkMode() {
    let savedMode = 'disabled';
    
    if (this.isLocalStorageAvailable) {
      savedMode = localStorage.getItem('darkMode') || 'disabled';
    }
    
    const isDarkMode = savedMode === 'enabled';
    this.darkMode.next(isDarkMode);
    
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }
}