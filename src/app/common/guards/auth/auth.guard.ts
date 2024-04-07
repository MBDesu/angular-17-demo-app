import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SessionManagementService } from '../../services/session-management/session-management.service';

export const authGuard: CanActivateFn = async (): Promise<boolean> => {
  const sessionManagementService: SessionManagementService = inject(SessionManagementService);
  if (!sessionManagementService.isLoggedIn) {
    await sessionManagementService.login();
  }
  return true;
};
