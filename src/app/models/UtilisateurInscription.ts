export class UtilisateurInscription {
    public nom: string;
    public prenom: string;
    public pass: string;
    public mail: string;


    constructor(nom: string, prenom: string, pass: string, mail: string) { 
        this.nom = nom;
        this.prenom = prenom;
        this.pass = pass;
        this.mail = mail;
    }


}