import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from '../models/usuarioLogin.model';
import { Funcionario } from '../models/funcionario.model';
import { tap, catchError, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioAuthService {

  private readonly API = 'http://localhost:8080/login/funcionario';

  constructor(private http: HttpClient) { }


  public logar(usuarioLogin: UsuarioLogin): Observable<boolean>{ 
    return this.http.post(`${this.API}`, usuarioLogin)
    .pipe(
      tap(funcionarioLogin => {
        this.salvarLogin(funcionarioLogin, usuarioLogin.permissao)
      }),
      mapTo(true),
      catchError(erro => {
        alert(erro.error.message);
        return of(false);
      }));
  }

  public  isFuncionarioLogado(){
    if(sessionStorage.getItem('permissao') === 'Funcionario'){
      return true;
    }
    return false;
  }

  private salvarLogin(funcionario: Funcionario, permissao: string){
    sessionStorage.setItem('id', funcionario.id.toString());
    sessionStorage.setItem('nome', funcionario.nome.toString());
    sessionStorage.setItem('permissao', permissao);
  }

}
