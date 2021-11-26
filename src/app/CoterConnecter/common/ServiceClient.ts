import { ClientEnregistrer } from './../../models/ClientEnregistrer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root' 
    })
export class ServiceClient {
    constructor(private http:HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    public urlBack: string = "http://localhost:8080/client/";


    public enregistrerClients(client:ClientEnregistrer[],idEntreprise:number){

        return this.http.post<ClientEnregistrer>(this.urlBack + `enregistrerClient/${idEntreprise}`, client ,this.httpOptions);

    }
    public getAllClient(idEntreprise:number ):Observable<any>{

        return this.http.get(this.urlBack + `AllClient/${idEntreprise}`);
    }
}