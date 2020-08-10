import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FuncionarioAuthService } from '../services/funcionario.auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioAuthGuard implements CanActivate {

  constructor(private funcionarioAuthService: FuncionarioAuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.funcionarioAuthService.isFuncionarioLogado()) {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
      return false;
  }
  
}
