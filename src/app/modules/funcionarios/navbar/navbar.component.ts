import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/shared/models/usuarioLogin.model';

@Component({
  selector: 'app-navbar-funcionario',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private rota: Router) { }
  
  public usuarioLogin: UsuarioLogin = new UsuarioLogin();

  ngOnInit(): void {

    this.usuarioLogin.nomeUsuario = sessionStorage.getItem('nome');
    this.usuarioLogin.id = Number.parseInt(sessionStorage.getItem('id'));

  }

  sair(){
    sessionStorage.clear();
    this.rota.navigate(['/login']);
  }


}
