import { Utilisateur } from '../../models/Utilisateur.model';
import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../common/serviceUtilisateur.service';
import { TokenService } from '../common/token.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private tokenService : TokenService) { }
  public user :Utilisateur;
  ngOnInit(): void {
    this.user = this.tokenService.getUser().user;
    console.log(this.tokenService.getUser().user)
  }
}
