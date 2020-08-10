import { Cliente } from './cliente.model';

export class Encomenda{
    constructor(public id? : number,
                public data?: Date, 
                public estado?: string,
                public cliente?: Cliente,
                public senha?: string,
               // public estacionamento?: Estacionamento
                ){}
}   