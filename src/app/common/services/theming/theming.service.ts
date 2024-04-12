import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  themeSwitch = new EventEmitter<boolean>();
  isDarkTheme = true;

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
    this.themeSwitch.emit(this.isDarkTheme);
  }

}
