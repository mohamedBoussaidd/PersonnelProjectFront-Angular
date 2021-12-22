import { Produit } from './Produit';
export class Facture{
    public numeroFacture : number;
    public produit : Produit[];
    public nomClient : string;

   constructor(produit:Produit[],nomClient:string){
       this.numeroFacture= Math.floor(Math.random() * 100000);
       this.produit= produit;
       this.nomClient = nomClient;
   }

}