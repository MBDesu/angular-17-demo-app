import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { githubRoutes, navigableRoutes, PageRoute } from '../../app.routes';
import { NavigableRoute } from '../../common/models/navigable-routes';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SessionManagementService } from '../../common/services/session-management/session-management.service';
import { NgOptimizedImage } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatSlideToggle,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit, AfterViewInit {

  @ViewChild('darkModeSwitch', { read: ElementRef })
  protected darkModeSwitchElement: ElementRef | undefined;

  @Input({ required: true })
  public title!: string;

  private isDark = true;
  protected navItems: NavigableRoute[] = [];
  protected opened = false;
  protected readonly PageRoute = PageRoute;

  constructor(public router: Router, public sessionManagementService: SessionManagementService) {}

  ngOnInit(): void {
    if (!this.navItems.length) {
      this.navItems = navigableRoutes;
    }

    this.router.events.subscribe((e): void => {
      if (e instanceof NavigationEnd) {
        this.updateNavItems();
      }
    });

    this.updateNavItems();
  }

  ngAfterViewInit(): void {
    if (this.darkModeSwitchElement) {
      this.darkModeSwitchElement
        .nativeElement
        .querySelector('.mdc-switch__icon--on')?.firstChild
        .setAttribute('d', 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5S14.76 7 12 7L12 7z M2 13l2 0c0.55 0 1-0.45 1-1s-0.45-1-1-1l-2 0 c-0.55 0-1 0.45-1 1S1.45 13 2 13z M20 13l2 0c0.55 0 1-0.45 1-1s-0.45-1-1-1l-2 0c-0.55 0-1 0.45-1 1S19.45 13 20 13z M11 2v2 c0 0.55 0.45 1 1 1s1-0.45 1-1V2c0-0.55-0.45-1-1-1S11 1.45 11 2z M11 20v2c0 0.55 0.45 1 1 1s1-0.45 1-1v-2c0-0.55-0.45-1-1-1 C11.45 19 11 19.45 11 20z M5.99 4.58c-0.39-0.39-1.03-0.39-1.41 0c-0.39 0.39-0.39 1.03 0 1.41l1.06 1.06 c0.39 0.39 1.03 0.39 1.41 0s0.39-1.03 0-1.41L5.99 4.58z M18.36 16.95c-0.39-0.39-1.03-0.39-1.41 0c-0.39 0.39-0.39 1.03 0 1.41 l1.06 1.06c0.39 0.39 1.03 0.39 1.41 0c0.39-0.39 0.39-1.03 0-1.41L18.36 16.95z M19.42 5.99c0.39-0.39 0.39-1.03 0-1.41 c-0.39-0.39-1.03-0.39-1.41 0l-1.06 1.06c-0.39 0.39-0.39 1.03 0 1.41s1.03 0.39 1.41 0L19.42 5.99z M7.05 18.36 c0.39-0.39 0.39-1.03 0-1.41c-0.39-0.39-1.03-0.39-1.41 0l-1.06 1.06c-0.39 0.39-0.39 1.03 0 1.41s1.03 0.39 1.41 0L7.05 18.36z')
      this.darkModeSwitchElement
        .nativeElement
        .querySelector('.mdc-switch__icon--off')?.firstChild
        .setAttribute('d', 'M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.2 0 .425.013 .225.013 .575.038-.9.8-1.4 1.975-.5 1.175-.5 2.475 0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.3 0 2.475-.463T20.95 11.15q.025.3 .038.488Q21 11.825 21 12q0 3.75-2.625 6.375T12 21Zm0-1.5q2.725 0 4.75-1.687t2.525-3.963q-.625.275-1.337.412Q17.225 14.4 16.5 14.4q-2.875 0-4.887-2.013T9.6 7.5q0-.6.125-1.287.125-.687.45-1.562-2.45.675-4.062 2.738Q4.5 9.45 4.5 12q0 3.125 2.188 5.313T12 19.5Zm-.1-7.425Z');
    }
  }

  protected navigateToGitHub(githubUrl: string | null): void {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  }

  protected resolveGithubUrlFromRoute(): string | null {
    const route = this.router.url.replace('/', '');
    return githubRoutes[route];
  }

  protected activate(route: string): void {
    this.router.navigate([route]).then((): void => {
      return;
    });
  }

  protected updateNavItems(): void {
    this.navItems.map((navItem: NavigableRoute): void => {
      navItem.active = this.router.url === '/' + navItem.route;
    });
  }

  protected toggleTheme(): void {
    if (this.isDark) {
      document.body.classList.add('light-theme');
      this.isDark = false;
    } else {
      document.body.attributes.removeNamedItem('class');
      this.isDark = true;
    }
  }

}
