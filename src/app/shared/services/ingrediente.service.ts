import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/ingrediente.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private readonly API = 'http://localhost:8080/ingrediente';

  constructor(private http: HttpClient) { }

  cadastrar(ingrediente: Ingrediente){ 
    return this.http.post(`${this.API}/cadastrar`, ingrediente).pipe();
  }

  editar(ingrediente){
    return this.http.put(`${this.API}/editar`, ingrediente).pipe(take(1));
  }

  deletar(id){ 
    console.log('esse ingrediente:', id);
    return this.http.delete(`${this.API}/deletar/${id}`).pipe();
  }

  getIngrediente(id){ 
    return this.http.get<Ingrediente>(`${this.API}/${id}`).pipe(take(1));
  }

  getIngredientes(){
    return this.http.get<Ingrediente[]>(`${this.API}/ingredientes`);
  }

}
