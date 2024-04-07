import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

export function storageFactory() : OAuthStorage {
  return localStorage;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideMomentDateAdapter(),
    provideOAuthClient(),
    { provide: OAuthStorage, useFactory: storageFactory },
    provideRouter(routes),
  ]
};
