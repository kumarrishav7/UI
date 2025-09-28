import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '3269f5d6-78e9-4886-bd46-cdc3343e4bfd',
    authority:
      'https://login.microsoftonline.com/bbb42506-ffb0-4c69-8992-db5661193ea3',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};
