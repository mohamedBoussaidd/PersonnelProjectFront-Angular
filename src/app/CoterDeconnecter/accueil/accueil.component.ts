import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/CoterConnecter/common/token.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor( private tokenService: TokenService, private redirect: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getUser().isConnected === true) {
      this.redirect.navigate(['/profil'])
    }
  }

}
