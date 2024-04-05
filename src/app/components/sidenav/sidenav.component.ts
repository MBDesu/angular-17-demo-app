import { Component, Input, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { navigableRoutes } from '../../app.routes';
import { NavigableRoute } from '../../common/models/navigable-routes';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SessionManagementService } from '../../common/services/session-management/session-management.service';
import { NgOptimizedImage } from '@angular/common';

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
    NgOptimizedImage,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

  @Input({ required: true })
  title!: string;

  navItems: NavigableRoute[] = [];
  opened = false;

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
  }

  protected activate(navItem: NavigableRoute): void {
    this.router.navigateByUrl(navItem.route).then((): void => {
      return;
    });
  }

  protected updateNavItems(): void {
    this.navItems.map((navItem: NavigableRoute): void => {
      navItem.active = this.router.url === '/' + navItem.route;
    });
  }

}
