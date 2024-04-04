import { Routes } from '@angular/router';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';
import { NavigableRoute } from './common/models/navigable-routes';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { authGuard } from './common/guards/auth/auth.guard';

export enum PageRoute {
  SPLASH = 'splash',
  DASHBOARD = 'dashboard',
  FORMS = 'forms',
}

export const navigableRoutes: NavigableRoute[] = [
  { label: 'Dashboard', route: PageRoute.DASHBOARD },
  { label: 'Forms', route: PageRoute.FORMS },
];

export const routes: Routes = [
  { path: '', redirectTo: PageRoute.SPLASH, pathMatch: 'full',    title: 'Some App', data: { displayNav: false } },
  { path: PageRoute.SPLASH,    component: SplashPageComponent,    title: 'Some App', data: { displayNav: false } },
  { path: PageRoute.DASHBOARD, component: DashboardPageComponent, title: 'Some App - Dashboard', canActivate: [authGuard] },
  { path: PageRoute.FORMS,     component: FormsPageComponent,     title: 'Some App - Forms',     canActivate: [authGuard] },
];
