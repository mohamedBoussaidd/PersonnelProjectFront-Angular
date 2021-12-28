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
    public urlBack: string = "http://localhost:8080/pdf/";

    public getPdf(idFacture : number){

        return this.http.get(this.urlBack + `getPdf/${idFacture}`,this.httpOptions);
    }
}