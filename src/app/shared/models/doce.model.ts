import { Ingrediente } from './ingrediente.model';

export class Doce{
    constructor(
        public id?: number,
        public nome?: string,
        public peso?: number,
        public descricao?: string,
        public foto?: string,
        public preco?: number,
        public ingredientes?: Ingrediente[],
        public quantidade?: number
    ){}
    
}