import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/shared/models/usuarioLogin.model';
import { ClienteAuthService } from 'src/app/shared/services/cliente.auth.service';
import { FuncionarioAuthService } from 'src/app/shared/services/funcionario.auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuarioLogin: UsuarioLogin = new UsuarioLogin(); 


  constructor(private rota: Router, private clienteAuthService: ClienteAuthService, private funcionarioAuthService: FuncionarioAuthService) { }

  ngOnInit(): void {
    this.usuarioLogin.permissao = 'Cliente';

    if (this.clienteAuthService.isClienteLogado()) {
      this.rota.navigate(['/cliente']);
    }
    else if(this.funcionarioAuthService.isFuncionarioLogado()){
      this.rota.navigate(['/funcionario']);
    }
    
  }
  

  logar(){ 
    console.log('logado');

    if(this.usuarioLogin.permissao === 'Cliente'){ 
      this.clienteAuthService.logar(this.usuarioLogin)
      .subscribe(sucess => {
        if (sucess) {
          this.rota.navigate(['/cliente'])
        }
      },
      error => alert('Erro ao entrar.'))
    } else if(this.usuarioLogin.permissao === 'Funcionario'){ 
      this.funcionarioAuthService.logar(this.usuarioLogin)
      .subscribe(sucess => {
        if (sucess) {
          this.rota.navigate(['/funcionario'])
        }
      },
      error => alert('Erro ao entrar.'))
    }
    

  }

}
