import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteAuthService } from '../services/cliente.auth.service';
import { FuncionarioAuthService } from '../services/funcionario.auth.service';

@Injectable({
    providedIn: 'root'
})
export class NaoLogadoAuthGuard implements CanActivate {

    constructor(private clienteAuthService: ClienteAuthService, private funcionarioAuthService: FuncionarioAuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

            /*
        if (this.clienteAuthService.isClienteLogado()) {
            this.router.navigate(['/cliente']);
            return false;
        } else if (this.funcionarioAuthService.isFuncionarioLogado()) {
            this.router.navigate(['/funcionario']);
            return false;
        } else {
            this.router.navigate(['/login']);
            return true;
        } */
        return true;
    }

}
