import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  userKey: string | null = window.sessionStorage.getItem('USER_KEY');
  tokenKey: string | null = window.sessionStorage.getItem('TOKEN_KEY');

  constructor(private http: HttpClient, private route: Router, private tokenStorage: TokenStorageService) {}

  login(): void {
    this.route.navigate(['login']);
  }

  register(): void {
    this.route.navigate(['register']);
  }

  logout(): void {
    this.tokenStorage.signOut();
  }
}
