import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <h1>Login</h1>
    <button (click)="login()">Login with Microsoft</button>
  `,
})
export class LoginComponent {
  constructor(private authService: MsalService) {}

  login() {
    this.authService.loginRedirect();
  }
}
