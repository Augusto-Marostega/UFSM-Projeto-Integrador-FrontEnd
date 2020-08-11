import { Cliente } from './cliente.model';
import { Doce } from './doce.model';

export class Encomenda{
    constructor(public id? : number,
                public data?: Date, 
                public estado?: string,
                public cliente?: Cliente,
                public senha?: string,
                public doces?: Doce[] 
                ){}
}   