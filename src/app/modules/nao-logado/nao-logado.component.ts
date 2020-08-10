import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteAuthService } from 'src/app/shared/services/cliente.auth.service';
import { FuncionarioAuthService } from 'src/app/shared/services/funcionario.auth.service';

@Component({
  selector: 'app-nao-logado',
  templateUrl: './nao-logado.component.html',
  styleUrls: ['./nao-logado.component.css']
})
export class NaoLogadoComponent implements OnInit {

  constructor(private rota: Router, private clienteAuthService: ClienteAuthService, private funcionarioAuthService: FuncionarioAuthService) { }

  ngOnInit(): void {

    if (this.clienteAuthService.isClienteLogado()) {
      this.rota.navigate(['/cliente']);
    }
    else if(this.funcionarioAuthService.isFuncionarioLogado()){
      this.rota.navigate(['/funcionario']);
    }
    
  }

}
