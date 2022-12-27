import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'poc_application';
  public isLoggedin = false;
  public profile: KeycloakProfile | null = null;

  constructor(private router: Router, private readonly keycloak: KeycloakService) {
  }

  public async ngOnInit(){
    // this.loginSession();
    this.isLoggedin = await this.keycloak.isLoggedIn();

    type roleUsers = Array<{id: number, text: string}>;

    if (this.isLoggedin) {
      this.profile = await this.keycloak.loadUserProfile();
      // console.log(this.keycloak.getToken());
      //console.log(this.keycloak.register());
    } else {
      this.loginSession();
      this.router.navigate(['/', 'home']);
      window.location.href = '/home';
    }
  }

  public loginSession() {
    this.keycloak.login();
  }

  public logoutSession(){
    this.keycloak.logout();
  }
}
