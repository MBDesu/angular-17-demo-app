import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  themeSwitch = new EventEmitter<boolean>();
  isDarkTheme = true;

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeSwitch.emit(this.isDarkTheme);
  }

}
