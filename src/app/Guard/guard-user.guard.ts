import { TokenService } from './../CoterConnecter/common/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardUserGuard implements CanActivate {

  constructor(private tokenService: TokenService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.tokenService.getUser().isConnected ==false ||this.tokenService.getUser().isConnected == null) {
      return false;
    }else{
      return true;
    }
  }

}
