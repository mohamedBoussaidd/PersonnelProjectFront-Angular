import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/Utilisateur.model';
import { UtilisateurInscription } from '../../models/UtilisateurInscription';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user!: Utilisateur;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    //LES DIFFERENTS URL DU BACK 
    public urlApi: string = "http://localhost:8080/api/auth/";
    public url: string = "http://localhost:8080/utilisateur/"

    /* FONCTION POUR VERIFIER L'AUTENTIFICATION DE L'UTILISATEUR PAR MAIL ET MOT DE PASSE */
    public authUser(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.urlApi + "signin", { username, password }, this.httpOptions);
    }
    /* FONCTION POUR INSCRIRE DES UTILISATEUR*/

    public inserUser(user: UtilisateurInscription): Observable<any> {

        return this.http.post<Utilisateur>(this.urlApi + "signup", JSON.stringify(user), this.httpOptions);
    }

    /* FONCTION POUR METTRE A JOUR LES DONNÉÉ DE L'UTILISATEUR */
    public updateUser(user: Utilisateur): Observable<any> {
        return this.http.post(this.url + "update", user, this.httpOptions);
    }

    /* FONCTION POUR ACTIVER LE COMPTE*/
    public activer(id: number, idActivation: string): Observable<any> {
        return this.http.post<any>(this.urlApi + "active", {
            id, idActivation
        }, this.httpOptions)
    }
}
