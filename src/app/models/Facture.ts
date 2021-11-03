import { Produit } from './Produit';
export class Facture{
    public numeroFacture : number;
    public produit : Produit[];


   constructor(Produit:Produit[]){
       this.numeroFacture= Math.floor(Math.random() * 100000);;
       this.produit= Produit;
   }

}