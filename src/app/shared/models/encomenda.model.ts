import { Cliente } from './cliente.model';
import { Doce } from './doce.model';
import { Encomenda_doce } from './encomenda_doce.model';
import { Encomenda_estado } from './encomenda_estado.model';

export class Encomenda{
    constructor(public id? : number,
                public data?: Date, 
                //public estado?: string,
                public cliente?: Cliente,
                //public senha?: string,
                public encomenda_doces?: Encomenda_doce[],
                public encomenda_estados?: Encomenda_estado[]
                ){}
}   