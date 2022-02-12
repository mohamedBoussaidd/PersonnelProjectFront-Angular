import { Produit } from './Produit';
export class Facture{
    public numeroFacture : number;
    public produit : Produit[];
    public nomClient : string;
    public numeroCommande : string;

   constructor(produit:Produit[],nomClient:string,numeroCommande:string){
       this.numeroFacture= Math.floor(Math.random() * 100000);
       this.produit= produit;
       this.nomClient = nomClient;
       this.numeroCommande =numeroCommande;
   }

}