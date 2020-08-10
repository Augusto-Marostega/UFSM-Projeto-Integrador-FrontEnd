import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Router } from '@angular/router';
import { FuncionarioAuthService } from 'src/app/shared/services/funcionario.auth.service';
import { ClienteAuthService } from 'src/app/shared/services/cliente.auth.service';

@Component({
  selector: 'app-cadastrar-se',
  templateUrl: './cadastrar-se.component.html',
  styleUrls: ['./cadastrar-se.component.css']
})
export class CadastrarSeComponent implements OnInit {

  cliente: Cliente;

  public myModel = '';
  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  erro: boolean;
  sucess: boolean;
  msg: string;
  senhaNova2: string;



  constructor(private clienteService: ClienteService,
              private rota: Router,
              private clienteAuthService: ClienteAuthService,
              private funcionarioAuthService: FuncionarioAuthService) { }

  ngOnInit(): void {

    this.erro = false;
    this.sucess = false;
    this.msg = '';

    this.cliente = new Cliente();

    if (this.clienteAuthService.isClienteLogado()) {
      this.rota.navigate(['/cliente']);
    }
    else if (this.funcionarioAuthService.isFuncionarioLogado()) {
      this.rota.navigate(['/funcionario']);
    }

  }

  cadastrar() {
    //console.log(this.cliente);
    //this.clienteService.getCliente(1).subscribe(q.log);


    if(this.cliente.senha !== this.senhaNova2){
      this.erro = true;
      this.sucess = false;
      this.msg = 'As senhas são diferentes e devem ser iguais.';
      return;
    }

    if(this.cliente.senha === this.senhaNova2 && this.cliente.senha != '' && this.cliente.senha.length < 4){
      this.erro = true;
      this.sucess = false;
      this.msg = 'A senha deve ter pelo menos 4 caracteres.';
      return;
    }




    this.clienteService.cadastrar(this.cliente)
      .subscribe(
        success => { alert('Cliente cadastrado com sucesso!'); this.rota.navigate(['/login']) },
        error => alert('Erro ao cadastrar cliente.')
      )


  }

}
