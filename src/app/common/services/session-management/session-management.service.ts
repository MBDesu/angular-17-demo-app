import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { PageRoute } from '../../../app.routes';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  isLoggedIn = false;

  constructor(private authService: OAuthService, private router: Router) {}

  public initialize(): void {
    const authConfig: AuthConfig = {
      clientId: '963658036131-qisveqqlblqbsvnq8ojtevkfqca2a55q.apps.googleusercontent.com',
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false,

      showDebugInformation: true,
    };
    this.authService.configure(authConfig);
    this.authService.setupAutomaticSilentRefresh();

    this.authService.events
      .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
      .subscribe(() => this.logout());
  }

  public async login(): Promise<void> {
    await this.authService.loadDiscoveryDocumentAndTryLogin().then((didReceiveTokens) => {
      if (didReceiveTokens) {
        this.isLoggedIn = true;
        return Promise.resolve();
      } else {
        if (this.authService.hasValidIdToken() && this.authService.hasValidAccessToken()) {
          this.isLoggedIn = true;
          return Promise.resolve();
        } else {
          return new Promise(resolve => {
            this.authService.initLoginFlow();
            window.addEventListener('unload', () => {
              resolve(true);
            });
          });
        }
      }
    });
  }

  public logout(): void {
    this.authService.revokeTokenAndLogout().then((idk) => console.log(idk));
    this.authService.logOut();
    this.router.navigate([PageRoute.SPLASH]).then(() => this.isLoggedIn = false);
  }

  public getProfile(): Record<string, string | number | boolean> {
    return this.authService.getIdentityClaims();
  }

  public getToken(): string {
    return this.authService.getAccessToken();
  }

}
