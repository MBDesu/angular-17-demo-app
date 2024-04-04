import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SessionManagementService } from '../../services/session-management/session-management.service';

export const authGuard: CanActivateFn = async () => {
  const sessionManagementService = inject(SessionManagementService);
  if (!sessionManagementService.isLoggedIn) {
    return await sessionManagementService.login();
  }
  console.log(JSON.stringify(sessionManagementService.getProfile(), null, 2));
  return true;
};
