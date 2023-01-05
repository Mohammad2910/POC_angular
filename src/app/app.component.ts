import {Component, Inject, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  public isLoggedin = false;
  public profile: KeycloakProfile | null = null;

  constructor(private router: Router, private readonly keycloak: KeycloakService) {
  }

  public async ngOnInit(){
    this.isLoggedin = await this.keycloak.isLoggedIn();

    // type roleUsers = Array<{id: number, text: string}>;

    if (this.isLoggedin) {
      let token = this.keycloak.getKeycloakInstance().token;
      console.log(token);
      localStorage.setItem('token', JSON.stringify(token));
      this.profile = await this.keycloak.loadUserProfile();
      this.router.navigate(['/', 'home']);
    } else {
      this.loginSession();
    }
  }

  public loginSession() {
    this.keycloak.login();
  }

  public logoutSession(){
    this.keycloak.logout();
  }
}
