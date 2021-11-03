export class Produit{

    public quantite :number;
    public designation : string;
    public prix: number;
    

    constructor(
        quantite: number, 
        designation: string, 
        prix: number,    
    ) {
        this.quantite = quantite
        this.designation = designation
        this.prix = prix
 
      }
}