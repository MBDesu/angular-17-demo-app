import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ThemingService } from '../../common/services/theming/theming.service';
import { KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    KeyValuePipe,
  ],
  templateUrl: './theme-page.component.html',
  styleUrl: './theme-page.component.scss'
})
export class ThemePageComponent implements OnInit {

  protected roleColorMap = new Map<string, string>();
  protected roles = [
    'primary', 'on-primary', 'primary-container', 'on-primary-container',
    'primary-fixed', 'primary-fixed-dim', 'on-primary-fixed', 'on-primary-fixed-variant',
    'secondary', 'on-secondary', 'secondary-container', 'on-secondary-container',
    'secondary-fixed', 'secondary-fixed-dim', 'on-secondary-fixed', 'on-secondary-fixed-variant',
    'tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container',
    'tertiary-fixed', 'tertiary-fixed-dim', 'on-tertiary-fixed', 'on-tertiary-fixed-variant',
    'error', 'on-error', 'error-container', 'on-error-container',
    'surface-dim', 'surface', 'surface-bright', 'surface-container-lowest',
    'surface-container-low', 'surface-container', 'surface-container-high', 'surface-container-highest',
    'on-surface', 'on-surface-variant', 'outline', 'outline-variant',
    'inverse-surface', 'inverse-on-surface', 'inverse-primary', 'scrim',
    'shadow',
  ];

  private themingService = inject(ThemingService);

  ngOnInit(): void {
    this.getRoles();
    this.themingService.themeSwitch.subscribe(() => {
      this.getRoles();
    });
  }

  protected getRoles(): void {
    const prefix = this.themingService.isDarkTheme ? '--dark-' : '--light-';
    const computedStyles = window.document.body.computedStyleMap();
    this.roles.forEach((role) => {
      const color = computedStyles.get(`${prefix}${role}`)?.toString();
      if (color) {
        this.roleColorMap.set(role, color);
      }
    });
  }

}
