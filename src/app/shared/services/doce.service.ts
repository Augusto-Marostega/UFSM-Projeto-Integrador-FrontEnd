import { Injectable } from '@angular/core';
import { Doce } from '../models/doce.model';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoceService {

  private readonly API = 'http://localhost:8080/doce';

  constructor(private http: HttpClient) { }

  cadastrar(doce: Doce){ 
    return this.http.post(`${this.API}/cadastrar`, doce).pipe();
  }

  editar(doce){
    return this.http.put(`${this.API}/editar`, doce).pipe(take(1));
  }

  deletar(id){ 
    console.log('esse doce:', id);
    return this.http.delete(`${this.API}/deletar/${id}`).pipe();
  }

  getDoce(id){ 
    return this.http.get<Doce>(`${this.API}/${id}`).pipe(take(1));
  }

  getDoces(){
    return this.http.get<Doce[]>(`${this.API}/doces`);
  }
}
