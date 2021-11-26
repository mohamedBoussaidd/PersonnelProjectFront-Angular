import { ProduitEnregistrer } from './../../models/ProduitEnregistrer';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ServiceProduit {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // URL DU BACK 
    public urlBack: string = "http://localhost:8080/produit/";

    constructor(private http: HttpClient) {

    }

    public enregistrerProduits(produit:ProduitEnregistrer[],idEntreprise:number){

        return this.http.post<ProduitEnregistrer>(this.urlBack + `enregistrerProduit/${idEntreprise}`, produit ,this.httpOptions);

    }

    public getAllProduit(idEntreprise:number ):Observable<any>{

        return this.http.get(this.urlBack + `AllProduits/${idEntreprise}`);
    }
}