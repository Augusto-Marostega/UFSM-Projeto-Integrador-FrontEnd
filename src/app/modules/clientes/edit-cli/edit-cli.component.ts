import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from 'src/app/shared/models/usuarioLogin.model';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { Observable } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-edit-cli',
  templateUrl: './edit-cli.component.html',
  styleUrls: ['./edit-cli.component.css']
})
export class EditCliComponent implements OnInit {

  public myModel = '';
  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  public cpfValido =  false;
  senhaAtual: string;
  senhaNova1: string;
  senhaNova2: string;
  


  public usuarioLogin: UsuarioLogin = new UsuarioLogin();
  

  cliente: Cliente = new Cliente();

  erro: boolean;
  sucess: boolean;
  msg: string;


  constructor(private rota: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.erro = false;
    this.sucess = false;
    this.msg = '';
    this.senhaAtual = '';
    this.senhaNova1 = '';
    this.senhaNova2 = '';

    this.usuarioLogin.nomeUsuario = sessionStorage.getItem('nome');
    this.usuarioLogin.id = Number.parseInt(sessionStorage.getItem('id'));

    this.clienteService.getCliente(this.usuarioLogin.id)
        .subscribe(dados => this.cliente = dados);

  }


  editarCliente(){


    if(this.senhaAtual != this.cliente.senha && this.senhaAtual != ''){
      this.erro = true;
      this.sucess = false;
      this.msg = 'Senha atual inválida.';
      return;
    }

    if(this.senhaNova1 !== this.senhaNova2){
      this.erro = true;
      this.sucess = false;
      this.msg = 'As novas senhas são diferentes e devem ser iguais.';
      return;
    }

    if(this.senhaNova1 === this.senhaNova2 && this.senhaAtual != '' && this.senhaNova1.length < 4){
      this.erro = true;
      this.sucess = false;
      this.msg = 'A nova senha deve ter pelo menos 4 caracteres.';
      return;
    }

    if(this.senhaNova1 === this.senhaNova2 && this.senhaAtual != '' && this.senhaNova1.length >= 4){
      this.cliente.senha = this.senhaNova1;
    }
    
    
    this.clienteService.editar(this.cliente)
      .subscribe(
        sucess => {
          this.erro = false;
          this.sucess = true;

          sessionStorage.setItem('id', this.cliente.id.toString());
          sessionStorage.setItem('nome', this.cliente.nome.toString());
          sessionStorage.setItem('permissao', 'Cliente');
          
          //window.location.reload();
          this.msg = 'Cliente editado com sucesso';
          alert('Cliente editado com sucesso');
        },
        error => {
          this.sucess = false;
          this.erro = true;
          this.msg = 'Erro ao editar Cliente.'
          alert('Erro ao editar Cliente');
        } 
      ) 

  }

  excluirConfirmar(){
    if(window.confirm('Tem certeza que deseja excluir a conta?')){
      this.excluirCliente();
    }
  }

  excluirCliente(){

    this.clienteService.deletar(this.cliente.id)
    .subscribe(
      sucess => { 
        this.erro = false;
        this.sucess = true;
        this.msg = 'Cliente excluído com sucesso';
        alert('Cliente excluído com sucesso');

        sessionStorage.clear();
         this.rota.navigate(['/login']);
      },
      error => {
        this.sucess = false;
        this.erro = true;
        this.msg = 'Erro ao excluir cliente.';
        alert('Erro ao excluir cliente.');
      }
    )

  }
  

}
