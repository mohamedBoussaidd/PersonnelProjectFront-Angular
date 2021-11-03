

export class ProduitEnregistrer {

    public designation: string;
    public prix: number;
    public stock: number;



    constructor(
        designation: string,
        prix: number,
        stock: number,

    ) {
        this.designation = designation
        this.prix = prix
        this.stock = stock
    }
}