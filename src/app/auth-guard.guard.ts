import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const msalService = inject(MsalService);
  await msalService.instance.initialize();
  const accounts = msalService.instance.getAllAccounts();

  if (accounts.length > 0) {
    return true;
  } else {
    msalService.loginRedirect({
      scopes: ['User.Read'],
      redirectStartPage: state.url,
    });
    return false;
  }
};
