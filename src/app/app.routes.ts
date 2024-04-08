import { Routes } from '@angular/router';
import { NavigableRoute } from './common/models/navigable-routes';
import { authGuard } from './common/guards/auth/auth.guard';

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
  {
    path: '',
    redirectTo: PageRoute.SPLASH,
    pathMatch: 'full',
    title: 'Some App'
  },
  {
    path: PageRoute.SPLASH,
    loadComponent: () => import('./pages/splash-page/splash-page.component')
      .then((x) => x.SplashPageComponent),
    title: 'Some App'
  },
  {
    path: PageRoute.DASHBOARD,
    loadComponent: () => import('./pages/dashboard-page/dashboard-page.component')
      .then((x) => x.DashboardPageComponent),
    title: 'Some App - Dashboard',
    canActivate: [authGuard]
  },
  {
    path: PageRoute.FORMS,
    loadComponent: () => import('./pages/forms-page/forms-page.component')
      .then((x) => x.FormsPageComponent),
    title: 'Some App - Forms',
    canActivate: [authGuard]
  },
  {
    path: PageRoute.PROFILE,
    loadComponent: () => import('./pages/profile-page/profile-page.component')
      .then((x) => x.ProfilePageComponent),
    title: 'Some App - User Profile',
    canActivate: [authGuard]
  },
];
