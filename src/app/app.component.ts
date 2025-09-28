import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, SilentRequest } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  accessToken: string | null = null;

  constructor(private authService: MsalService) {}

  async ngOnInit() {
    await this.authService.instance.initialize();
    await this.authService.instance.handleRedirectPromise();
    const accounts = this.authService.instance.getAllAccounts();
    this.isLoggedIn = accounts.length > 0;
    if (this.isLoggedIn) {
      this.getAccessToken();
    }
  }

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logoutRedirect();
  }

  async getAccessToken() {
    const account = this.authService.instance.getAllAccounts()[0];

    if (!account) return;

    const request: SilentRequest = {
      scopes: ['User.Read'],
      account: account,
    };

    try {
      const result: AuthenticationResult =
        await this.authService.instance.acquireTokenSilent(request);

      this.accessToken = result.accessToken;
      console.log('Access Token:', this.accessToken);
    } catch (error) {
      console.warn(
        'Silent token acquisition failed, fallback to redirect',
        error
      );
      this.authService.acquireTokenRedirect(request);
    }
  }
}
