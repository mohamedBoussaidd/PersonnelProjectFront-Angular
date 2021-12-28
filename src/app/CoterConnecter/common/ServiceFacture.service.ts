import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Facture } from "src/app/models/Facture";

@Injectable({
    providedIn: 'root',
})
export class ServiceFacture {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // URL DU BACK 
    public urlBack: string = "http://localhost:8080/facture/";

    constructor(private http: HttpClient) {

    }

    public enregistrerFacture(facture:Facture, idEntreprise:number): Observable<any> {
        console.log(facture)
        let numeroFacture = facture.numeroFacture
        let produit :any[] = facture.produit
        let nomClient : string = facture.nomClient
        
        return this.http.post<Facture>(this.urlBack + `enregistrerFacture/${idEntreprise}`, facture, this.httpOptions);

        //il faut un numeroFacture
        //il faut un tableau de produit avec le nom produit
        // dans le produit doit i avoir une designation un prix une quantite
    }
    public getAllFacture(idEntreprise:number ):Observable<any>{

        return this.http.get(this.urlBack + `AllFactures/${idEntreprise}`);
    }
    
}