import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from '../models/usuarioLogin.model';
import { Cliente } from '../models/cliente.model';
import { tap, catchError, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteAuthService {

  private readonly API = 'http://localhost:8080/login/cliente';

  constructor(private http: HttpClient) { }

  public logar(usuarioLogin: UsuarioLogin): Observable<boolean>{ 
    return this.http.post(`${this.API}`, usuarioLogin)
    .pipe(
      tap(clienteLogin => {
        this.salvarLogin(clienteLogin, usuarioLogin.permissao)
      }),
      mapTo(true),
      catchError(erro => {
        alert(erro.error.message);
        return of(false);
      }));
  }

  public isClienteLogado() {

    if(sessionStorage.getItem('permissao') === 'Cliente'){
      return true;
    }
    return false;
  }

  private salvarLogin(cliente: Cliente, permissao: string){
    sessionStorage.setItem('id', cliente.id.toString());
    sessionStorage.setItem('nome', cliente.nome.toString());
    sessionStorage.setItem('permissao', permissao);
  }
  
}
