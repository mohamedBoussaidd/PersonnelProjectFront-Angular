import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn :'root'
})
export class ServicePdf {
    constructor(private http: HttpClient) {
        
    }
    public urlBack: string = "http://localhost:8080/pdf/";

    public getPdf(){
        return this.http.get(this.urlBack + "getPdf");
    }
}