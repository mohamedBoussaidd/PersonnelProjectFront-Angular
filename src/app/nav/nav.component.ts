import { Router } from '@angular/router';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../CoterConnecter/common/token.service';
import { Utilisateur } from '../models/Utilisateur.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private serviceToken: TokenService, private route: Router) { }
  public estConnected: boolean=false;
  public estAdmin: boolean = false;
  public entrepriseSelectionne = false;
  public user :Utilisateur;
  public idEntreprise: number;

  
  ngOnInit(): void {
    this.user = this.serviceToken.getUser().user;

    this.estConnected = this.serviceToken.getUser().isConnected;

    if (this.serviceToken.getUser().roles === "ROLE_ADMIN") {
      this.estAdmin = true;
    }
      // ON RECUPERE L 'ID DE L'ENTREPRISE EN CHOISI
      this.idEntreprise = JSON.parse(window.sessionStorage.getItem("idEntreprise"))
      console.log(this.idEntreprise)
      if(this.idEntreprise != null){
        this.entrepriseSelectionne =true
      }
  
  }

  

  // FONCTION POUR EFFACE LE  STORAGE ET DONC SE DECONNECTER 
  public deconnexion() {
    window.sessionStorage.clear()
    this.estConnected =false;
    this.route.navigate(['/Accueil'])
  }

}
