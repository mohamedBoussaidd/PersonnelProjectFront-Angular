import { Entreprise } from './../../models/Entreprise';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/Utilisateur.model';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../common/serviceUtilisateur.service';
import { TokenService } from '../common/token.service';
import { ServiceEntreprise } from '../common/ServiceEntreprise';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private tokenService : TokenService, private router :Router,private serviceEntreprise:ServiceEntreprise) { }
  public user :Utilisateur;
  public listEntreprise :Entreprise[]=[];

  ngOnInit(): void {
    this.user = this.tokenService.getUser().user;
    console.log(this.tokenService.getUser().user)
    this.serviceEntreprise.getAll().subscribe((param)=>{
      console.log(param)
      this.listEntreprise= param
    });
  }
  public AjoutEntreptrise(){
    this.router.navigate(['entreprise']);
  }
  public naviguer(i:number){
     // par defaut, on enlève un potentiel id d'entreprise present
     window.sessionStorage.removeItem("idEntreprise");
     // on enregistre celui qu'on veut conserver
     window.sessionStorage.setItem("idEntreprise", i.toString());
     this.router.navigate(['GererEntreprise']);
  }
}
