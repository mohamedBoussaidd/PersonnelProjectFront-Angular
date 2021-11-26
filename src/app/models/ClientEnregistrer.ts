export class ClientEnregistrer {

    public nom :string;
    public email :string;
    public numero : string;
    public adresse: string;

    constructor(nom:string, email:string, numero:string, adresse:string) {
        this.nom =nom;
        this.email =email;
        this.numero =numero;
        this.adresse = adresse   
    }
}