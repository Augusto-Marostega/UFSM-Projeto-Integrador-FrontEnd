import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteAuthService } from '../services/cliente.auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteAuthGuard implements CanActivate {

  constructor(private clienteAuthService: ClienteAuthService, private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (this.clienteAuthService.isClienteLogado()) {
        return true;
      } else {
        this.router.navigate(['/login']);
      }
      return false;
  }
  
}
