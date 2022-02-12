import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn :'root'
})
export class ServicePdf {
    constructor(private http: HttpClient) {
        
    }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/pdf'
        })
    }
    public urlBack: string = "http://localhost:8080/fichiers/";

    public getPdf(nomFichier : string ):any{

        return this.http.get(this.urlBack + `fichier/${nomFichier}`,{responseType: 'arraybuffer'});
    }
}