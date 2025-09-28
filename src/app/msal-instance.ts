import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { msalConfig } from '../msal-config';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}
