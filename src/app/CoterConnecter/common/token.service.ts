import { Injectable } from '@angular/core';

// On défini les clés qui vont correspondre au stockage
// du user et du Token
// Pour comparer elle représenterait l'index de notre user & token
// dans le tableau "sessionStorage"
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  // Fonction qui sert a enregistrer le Token
  public saveToken(token: string): void {
    // par defaut, on enlève un potentiel Token existant
    window.sessionStorage.removeItem(TOKEN_KEY);
    // on enregistre celui qu'on veut conserver
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  
  // Fonction qui sert a sauver les "claims" de l'utilisateur
  public saveUser(user: any): void {
    // Par defaut, on enlève un potentiel utilisateur existant
    window.sessionStorage.removeItem(USER_KEY);
    // on enregistre celui qu'on veut conserver
    // On DOIT convertir le JSON en String
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Récupère le token
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // Récupère le user
  public getUser(): any {
    // on recupère le user enregistré
    const user = window.sessionStorage.getItem(USER_KEY);
    // s'il existe
    if (user) {
      // on le renvoi, mais sachant qu'on avait convertit le JSON en String
      // on doit le renvoyer en faisant la conversion en sens inverse.
      return JSON.parse(user);
    }
    return {};
  }
}
