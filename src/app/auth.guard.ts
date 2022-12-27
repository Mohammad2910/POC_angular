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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedin) {
      //this.profile = await this.keycloak.loadUserProfile();
      //console.log(this.keycloak.getToken());
      //console.log(this.keycloak.register());
      return true;
    }

    // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url, user: route.queryParams.user, token: route.queryParams.token}});
    return false;
  }
}
