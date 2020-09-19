//import { Estacionamento } from './estacionamento.model';

import { Encomenda } from './encomenda.model';
import { Doce } from './doce.model';

export class Encomenda_doce {
    constructor(
        public id?: number,
        public quantidade?: number,
        public preco_un?: number,
        public encomenda?: Encomenda,
        public doce?: Doce
        // public estacionamento?: Estacionamento
        //public encomendas?: Encomenda[]
    ) { }
}   