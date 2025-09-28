import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { from } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const msalService = inject(MsalService);

  let account = msalService.instance.getActiveAccount();
  if (!account) {
    const accounts = msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      account = accounts[0];
      msalService.instance.setActiveAccount(account);
    }
  }
  if (!account) {
    console.warn('No MSAL account found - sending request without token');
    return next(req);
  }

  const scopes = ['User.Read'];
  return from(msalService.acquireTokenSilent({ account, scopes })).pipe(
    switchMap((tokenResponse) => {
      if (!tokenResponse || !tokenResponse.accessToken) {
        console.warn('Token response invalid - sending request without token');
        return next(req);
      }
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      });

      return next(cloned);
    }),
    catchError((error) => {
      console.warn('Token acquisition failed', error);
      if (error instanceof InteractionRequiredAuthError) {
        msalService.loginRedirect({ scopes });
      }
      return next(req);
    })
  );
};
