//import { Estacionamento } from './estacionamento.model';

import { Encomenda } from './encomenda.model';

export class Cliente {
    constructor(
        public id?: number,
        public nome?: string,
        public nomeUsuario?: string,
        public senha?: string,
        public cpf?: string
        // public estacionamento?: Estacionamento
        //public encomendas?: Encomenda[]
    ) { }
}   