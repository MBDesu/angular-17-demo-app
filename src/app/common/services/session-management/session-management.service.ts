import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { PageRoute } from '../../../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  isLoggedIn = false;

  constructor(private authService: OAuthService, private router: Router) {}

  public initialize(): void {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '963658036131-qisveqqlblqbsvnq8ojtevkfqca2a55q.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email',
    };
    this.authService.configure(authConfig);
    this.authService.setupAutomaticSilentRefresh();
  }

  public async login(): Promise<boolean> {
    if (!this.isLoggedIn) {
      this.isLoggedIn = await this.authService.loadDiscoveryDocumentAndTryLogin();
      if (!this.isLoggedIn) {
        this.authService.initImplicitFlow();
      }
      return Promise.resolve(this.isLoggedIn);
    }
    return false;
  }

  public logout(): void {
    this.authService.revokeTokenAndLogout().then((idk) => console.log(idk));
    this.authService.logOut();
    this.router.navigateByUrl(PageRoute.SPLASH).then(() => this.isLoggedIn = false);
  }

  public getProfile(): Record<string, unknown> {
    return this.authService.getIdentityClaims();
  }

  public getToken(): string {
    return this.authService.getAccessToken();
  }

}
