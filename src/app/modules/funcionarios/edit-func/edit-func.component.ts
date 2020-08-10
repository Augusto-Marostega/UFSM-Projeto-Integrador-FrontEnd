import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from 'src/app/shared/models/usuarioLogin.model';
import { Funcionario } from 'src/app/shared/models/funcionario.model';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/shared/services/funcionario.service';

@Component({
  selector: 'app-edit-func',
  templateUrl: './edit-func.component.html',
  styleUrls: ['./edit-func.component.css']
})
export class EditFuncComponent implements OnInit {


  public usuarioLogin: UsuarioLogin = new UsuarioLogin();

  funcionario: Funcionario = new Funcionario();

  erro: boolean;
  sucess: boolean;
  msg: string;

  senhaAtual: string;
  senhaNova1: string;
  senhaNova2: string;


  constructor(private rota: Router, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.erro = false;
    this.sucess = false;
    this.msg = '';
    this.senhaAtual = '';
    this.senhaNova1 = '';
    this.senhaNova2 = '';
    
    this.usuarioLogin.nomeUsuario = sessionStorage.getItem('nome');
    this.usuarioLogin.id = Number.parseInt(sessionStorage.getItem('id'));

    this.funcionarioService.getFuncionario(this.usuarioLogin.id)
        .subscribe(dados => this.funcionario = dados);
  }

  editarFuncionario(){

    
    if(this.senhaAtual != this.funcionario.senha){
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
    
    this.funcionario.senha = this.senhaNova1;
    
    this.funcionarioService.editar(this.funcionario)
      .subscribe(
        sucess => {
          this.erro = false;
          this.sucess = true;

          sessionStorage.setItem('id', this.funcionario.id.toString());
          sessionStorage.setItem('nome', this.funcionario.nome.toString());
          sessionStorage.setItem('permissao', 'Funcionário');
          //window.location.reload();
          this.msg = 'Funcionário editado com sucesso';
          alert('Funcionário editado com sucesso');
        },
        error => {
          this.sucess = false;
          this.erro = true;
          this.msg = 'Erro ao editar Funcionário.'
          alert('Erro ao editar Funcionário');
        } 
      ) 

  }

}
