import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entreprise } from 'src/app/models/Entreprise';

@Injectable({providedIn: 'root'})
export class ServiceEntreprise {

    constructor(private http:HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
      // URL DU BACK 
    public urlBack: string = "http://localhost:8080/entreprise/";

    // AJOUTE D'UNE ENTREPRISE A LA LISTE D'UTILISATEUR
    public addEntrerprise(entreprise :Entreprise):Observable<any>{
        return this.http.post<Entreprise>(this.urlBack+"addEntreprise",entreprise,this.httpOptions)
    }
    //RECUPERATION DE LA LISTE D'NETREPRISE DE L'UTILISATEUR
    public getAll():Observable<any>{
        return this.http.get(this.urlBack + "allEntreprise");
    }
    // RECUPERATION D'UNE ETREPRISE PAR L'ID
    public getEntreprise(entrepriseId :number):Observable<any>{
        
        return this.http.get(this.urlBack + `entrepriseById/${entrepriseId}`);
    }
    public supprimerEntreprise( idEntreprise: number):Observable<any> {
        return this.http.delete(this.urlBack + `supprimerEntreprise/${idEntreprise}`,this.httpOptions);
    }
}