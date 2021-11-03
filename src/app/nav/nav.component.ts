import { Router } from '@angular/router';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../CoterConnecter/common/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private serviceToken: TokenService, private route: Router) { }
  public isConnected: boolean=false;
  public isAdmin: boolean = false;
  ngOnInit(): void {
    this.isConnected = this.serviceToken.getUser().isConnected;

    if (this.serviceToken.getUser().roles === "ROLE_ADMIN") {
      this.isAdmin = true;
    }
  
  }

  // FONCTION POUR EFFACE LE  STORAGE ET DONC SE DECONNECTER 
  public deconnexion() {
    window.sessionStorage.clear()
    this.isConnected =false;
    this.route.navigate([''])
  }

}
