//import { Estacionamento } from './estacionamento.model';

import { Encomenda } from './encomenda.model';
import { Doce } from './doce.model';
import { Funcionario } from './funcionario.model';

export class Encomenda_estado {
    constructor(
        public id?: number,
        public data?: Date,
        public estado?: string,
        public encomenda?: Encomenda,
        public funcionario?: Funcionario
    ) { }
}   