import { Utilisateur } from './models/Utilisateur.model';
import { UtilisateurService } from './CoterConnecter/common/serviceUtilisateur.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './CoterConnecter/common/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ProjetP1';
  constructor(private route: Router, private serviceToken: TokenService) { }

  ngOnInit(): void {

  }

 
}
