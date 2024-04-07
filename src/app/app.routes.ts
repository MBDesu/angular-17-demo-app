import { Routes } from '@angular/router';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';
import { NavigableRoute } from './common/models/navigable-routes';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { authGuard } from './common/guards/auth/auth.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export enum PageRoute {
  SPLASH = 'splash',
  DASHBOARD = 'dashboard',
  FORMS = 'forms',
  PROFILE = 'profile',
}

export const githubRoutes: { [key: string]: string } = {
  'dashboard': 'https://github.com/MBDesu/angular-17-demo-app/tree/main/src/app/pages/dashboard-page',
  'forms': 'https://github.com/MBDesu/angular-17-demo-app/tree/main/src/app/pages/forms-page',
  'profile': 'https://github.com/MBDesu/angular-17-demo-app/tree/main/src/app/pages/profile-page',
};

export const navigableRoutes: NavigableRoute[] = [
  { label: 'Dashboard', route: PageRoute.DASHBOARD },
  { label: 'Forms', route: PageRoute.FORMS },
];

export const routes: Routes = [
  { path: '', redirectTo: PageRoute.SPLASH, pathMatch: 'full',    title: 'Some App', data: { displayNav: false } },

  { path: PageRoute.SPLASH,    component: SplashPageComponent,    title: 'Some App', data: { displayNav: false } },
  { path: PageRoute.DASHBOARD, component: DashboardPageComponent, title: 'Some App - Dashboard',    canActivate: [authGuard] },
  { path: PageRoute.FORMS,     component: FormsPageComponent,     title: 'Some App - Forms',        canActivate: [authGuard] },
  { path: PageRoute.PROFILE,   component: ProfilePageComponent,   title: 'Some App - User Profile', canActivate: [authGuard] },
];
