import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly API = 'http://localhost:8080/funcionario';

  constructor(private http: HttpClient) { }

  cadastrar(cliente: Funcionario) {
    return this.http.post(`${this.API}/cadastrar`, cliente).pipe();
  }

  editar(funcionario) {
    return this.http.put(`${this.API}/editar`, funcionario).pipe(take(1));
  }

  deletar(id) {
    console.log('esse cliente:', id);
    return this.http.delete(`${this.API}/deletar/${id}`).pipe();
  }

  getFuncionario(id) {
    return this.http.get<Funcionario>(`${this.API}/${id}`).pipe(take(1));
  }
}
