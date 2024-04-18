import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { PageRoute } from '../../../app.routes';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TimeoutService } from '../timeout-service/timeout.service';
import { TimeoutModalComponent } from '../../../components/timeout-modal/timeout-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  private authService = inject(OAuthService);
  private dialog = inject(MatDialog);
  private idleTimeoutInSeconds = 45;
  private idleExpiryInSeconds = 15;
  private router = inject(Router);
  private timeoutService = inject(TimeoutService);
  private timeoutSubscription: Subscription = new Subscription();

  public isLoggedIn = false;

  public initialize(): void {
    const authConfig: AuthConfig = {
      clientId: '963658036131-qisveqqlblqbsvnq8ojtevkfqca2a55q.apps.googleusercontent.com',
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false,
    };
    this.authService.configure(authConfig);
    this.authService.setupAutomaticSilentRefresh({listenTo: 'id_token'});

    this.authService.events
      .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
      .subscribe(() => this.logout());
  }

  public async login(): Promise<void> {
    await this.authService.loadDiscoveryDocumentAndTryLogin().then((didReceiveTokens) => {
      if (didReceiveTokens) {
        this.isLoggedIn = true;
        this.startIdleTimer();
        return Promise.resolve();
      } else {
        if (this.authService.hasValidIdToken() && this.authService.hasValidAccessToken()) {
          this.isLoggedIn = true;
          this.startIdleTimer();
          return Promise.resolve();
        } else {
          return new Promise(resolve => {
            this.authService.initLoginFlow();
            this.timeoutSubscription.unsubscribe();
            window.addEventListener('unload', () => {
              resolve(true);
            });
          });
        }
      }
    });
  }

  public logout(): void {
    this.timeoutSubscription.unsubscribe();
    this.router.navigate([PageRoute.SPLASH]).then(() => {
      this.isLoggedIn = false;
      this.authService.revokeTokenAndLogout().then(() => {
        return;
      });
    });
  }

  public getProfile(): Record<string, string | number | boolean> {
    return this.authService.getIdentityClaims();
  }

  private startIdleTimer(): void {
    this.timeoutSubscription = this.timeoutService.startWatching(this.idleTimeoutInSeconds)
      .subscribe((isTimedOut: boolean): void => {
        if (isTimedOut) {
          this.timeoutService.stopIdleTimer();
          const dialogRef = this.dialog.open(TimeoutModalComponent, {
            data: { countdownStart: this.idleExpiryInSeconds },
          });
          dialogRef.afterClosed().subscribe((result: boolean): void => {
            if (result) {
              this.timeoutService.resetIdleTimer();
            } else {
              this.timeoutSubscription.unsubscribe();
              this.logout();
            }
          });
        }
      });
  }

}
