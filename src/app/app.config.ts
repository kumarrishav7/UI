import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  MsalInterceptor,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MSAL_INSTANCE,
} from '@azure/msal-angular';
import { routes } from './app.routes';
import { MSALInstanceFactory } from './msal-instance';
import { authInterceptor } from './msal-http-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    MsalService,
    MsalGuard,
    provideHttpClient(withInterceptors([authInterceptor])),
    MsalBroadcastService,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
};
