import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "../services/user.service";
import {RolesEnum} from "../enums/roles.enum";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['requiredRoles'];
    console.log(requiredRoles)
    if(requiredRoles.find((role: RolesEnum ): boolean => role === this.userService.getUser().role))
      return true
      // if(this.userService.getUser().role === RolesEnum.ROLE_ADMIN)
      // return true;
    this.router.navigate(['/home']);
    return false;
  }

}
