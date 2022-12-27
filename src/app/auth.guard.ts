import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Injectable()
export class AuthGuard implements CanActivate {
  public isLoggedin = false;
  public profile: KeycloakProfile | null = null;
  constructor(private router: Router, private readonly keycloak: KeycloakService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isLoggedin = await this.keycloak.isLoggedIn();
    return this.isLoggedin;
  }
}
